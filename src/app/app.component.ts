import { SharedService } from './shared/shared.service';
import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar, MatIconRegistry } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { NotificationService } from './shared/notification.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { fadeAnimation, routerTransition } from './shared/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('iconChange', [
      state('true',
        style({ transform: 'rotate( 180deg )' })
      ),
      state('false',
        style({ transform: 'rotate( 0deg )' })
      ),
      transition('* => *', animate('.25s'))
    ]),
    routerTransition,
    fadeAnimation
  ]
})
export class AppComponent implements OnDestroy {

  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

  title = 'Gestión de Solicitudes';
  shortnav = true;
  isCollapsed = true;
  isMouseOverMenu = false;

  SIDENAV_WIDTH_EXPANDED = 245;
  SIDENAV_WIDTH_COLLAPSED = 64;

  sideNavWidth = this.SIDENAV_WIDTH_EXPANDED;
  navContentLeft = this.SIDENAV_WIDTH_EXPANDED;
  notificationSubcription: Subscription;

  loading = false;

  constructor( sharedService: SharedService,
              public snackBar: MatSnackBar,
              private notificationService: NotificationService,
              private iconRegistry: MatIconRegistry,
              private sanatizer: DomSanitizer,
              router: Router) {

    // Global notification subscription
    this.notificationSubcription = this.notificationService.notification.subscribe( notificationDetail => {
      snackBar.open( notificationDetail.message, null,
                    { duration: 3000, panelClass: notificationDetail.type } );
    });

    // Router events notification subscription
    router.events.subscribe( (routerEvent: Event ) => {
      this.checkRouterEvent(routerEvent);
    });

    // Register SVG icons
    this.iconRegistry.addSvgIcon('jpg_icon', this.sanatizer.bypassSecurityTrustResourceUrl('../assets/images/JPG_logo.svg'));
    this.iconRegistry.addSvgIcon('png_icon', this.sanatizer.bypassSecurityTrustResourceUrl('../assets/images/PNG_logo.svg'));
    this.iconRegistry.addSvgIcon('other_icon', this.sanatizer.bypassSecurityTrustResourceUrl('../assets/images/Text_Generic_logo.svg'));
    this.iconRegistry.addSvgIcon('word_icon',
      this.sanatizer.bypassSecurityTrustResourceUrl('../assets/images/Microsoft_Word_2013_logo.svg'));
    this.iconRegistry.addSvgIcon('excel_icon',
      this.sanatizer.bypassSecurityTrustResourceUrl('../assets/images/Microsoft_Excel_2013_logo.svg'));
    this.iconRegistry.addSvgIcon('pdf_icon', this.sanatizer.bypassSecurityTrustResourceUrl('../assets/images/PDF_logo.svg'));
  }

  checkRouterEvent(routerEvent: Event): void {
    if ( routerEvent instanceof NavigationStart ) {
      this.loading = true;
    }

    if ( routerEvent instanceof NavigationEnd
          || routerEvent instanceof NavigationCancel
          || routerEvent instanceof NavigationError ) {

      this.loading = false;
    }
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
    this.shortnav = !this.shortnav;
    this.change.emit(this.shortnav);
    this.sideNavWidth = this.isCollapsed ? this.SIDENAV_WIDTH_COLLAPSED : this.SIDENAV_WIDTH_EXPANDED;
    this.navContentLeft = this.isCollapsed ? this.SIDENAV_WIDTH_COLLAPSED : this.SIDENAV_WIDTH_EXPANDED;
  }

  processMouseEvents( mouseOver: boolean) {
    this.isMouseOverMenu = mouseOver;
    if (mouseOver && this.isCollapsed) {
      this.sideNavWidth = this.SIDENAV_WIDTH_EXPANDED;
    } else if ( !mouseOver && this.isCollapsed ) {
      this.sideNavWidth = this.SIDENAV_WIDTH_COLLAPSED;
    }
  }


  state(outlet) { return outlet.isActivated ? outlet.activatedRoute : ''; }


  ngOnDestroy(): void {
    this.notificationSubcription.unsubscribe();
  }

}
