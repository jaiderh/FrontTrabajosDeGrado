import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new  Subject<Notification>();
  notification = this.notificationSubject.asObservable();

  constructor() { }

  show( notification: Notification ) {
    this.notificationSubject.next( notification );
  }

  showError(message: string) {
    this.show( { message: message, type: Notification_Type.ERROR  } );
  }

  showInformation(message: string) {
    this.show( { message: message, type: Notification_Type.INFORMATION  } );
  }

  showAlert(message: string) {
    this.show( { message: message, type: Notification_Type.ALERT  } );
  }
}

export class Notification {
  message: string;
  type: Notification_Type;
}

export enum Notification_Type {
  INFORMATION = 'information',
  ERROR = 'error',
  ALERT = 'alert'
}
