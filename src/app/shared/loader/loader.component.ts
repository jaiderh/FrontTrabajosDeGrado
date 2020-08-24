import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  exportAs: 'loader'
})
export class LoaderComponent implements OnInit, OnDestroy {

  show = false;

  @Input() diameter = 80;
  @Input() type = LoaderType.PANEL;

  private subscription: Subscription;

  constructor( private loaderService: LoaderService ) { }

  ngOnInit() {
      this.subscription = this.loaderService.loading
          .subscribe((state: boolean) =>  this.show = state );
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  isPanelType() {
    return this.type === LoaderType.PANEL;
  }
}

export enum LoaderType {
  PANEL, SPINNER_ONLY
}
