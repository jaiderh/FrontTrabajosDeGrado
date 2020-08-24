import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpEvent, HttpResponse,
   HttpRequest, HttpHandler, HttpSentEvent,
   HttpHeaderResponse, HttpProgressEvent,
   HttpUserEvent,
   HttpErrorResponse} from '@angular/common/http';
import { LoaderService } from './loader.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import { NotificationService, Notification_Type } from '../notification.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService,
              private notificationService: NotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse |
         HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

    this.loaderService.show();

    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.loaderService.hide();
      }

    }, (err: HttpErrorResponse) => {
      this.loaderService.hide();
      console.log(err);
      let msg = '';

      if (err.error instanceof ErrorEvent) {
        msg = `ERROR: ${err.error.message}`;
      } else {

        console.log(err.error.constructor.name);
        msg = `ERROR: (${err.status}) ${err.error.Message}`;
      }

      this.notificationService.showError(msg);
    });
  }

}
