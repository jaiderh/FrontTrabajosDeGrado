import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { BreadCrumb } from './breadcrumb';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: [ './breadcrumb.component.css' ],
    encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements OnInit {

    // breadcrumbs$: Observable<Array<BreadCrumb>>;
    breadcrumbs: Array<BreadCrumb> = [];

    // Build your breadcrumb starting with the root route of your current activated route
    constructor(private activatedRoute: ActivatedRoute,
                private router: Router) {
                  /*
      this.breadcrumbs$ = this.router.events
                        .filter(event => event instanceof NavigationEnd)/*
                        .distinctUntilChanged()*/
                        /*.map(event => this.parseRoute(this.router.routerState.snapshot.root));*/


      this.parseRoute( this.activatedRoute.snapshot.root );
    }

    ngOnInit() {
      /*
      console.log('ngOnInit');
      this.breadcrumbs$ = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .distinctUntilChanged()
      .map(event => this.buildBreadCrumb(this.activatedRoute.root));
      */
    }


    parseRoute(node: ActivatedRouteSnapshot) {
      console.log('on parseRoute method');
      if (node.data['breadcrumb']) {
          let urlSegments: UrlSegment[] = [];
          node.pathFromRoot.forEach(routerState => {
              urlSegments = urlSegments.concat(routerState.url);
          });
          const url = urlSegments.map(urlSegment =>  urlSegment.path ).join('/');
          this.breadcrumbs.push( new BreadCrumb( node.data['breadcrumb'], '/' + url ) );
      }
      if (node.firstChild) {
          this.parseRoute(node.firstChild);
      }
  }

  /*
    buildBreadCrumb(route: ActivatedRoute, url: string = '',
                    breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
        console.log('buildBreadCrumb');
        // If no routeConfig is avalailable we are on the root path
        const label = route.routeConfig ? route.routeConfig.data[ 'breadcrumb' ] : 'Inicio';
        const path = route.routeConfig ? route.routeConfig.path : '';
        // In the routeConfig the complete path is not available,
        // so we rebuild it each time
        const nextUrl = `${url}${path}/`;
        const breadcrumb = {
            label: label,
            url: nextUrl
        };
        const newBreadcrumbs = [ ...breadcrumbs, breadcrumb ];
        if (route.firstChild) {
            // If we are not on our current path yet,
            // there will be more children to look after, to build our breadcumb
            return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
        }
        return newBreadcrumbs;
    }
    */
}
