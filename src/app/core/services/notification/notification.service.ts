import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from 'src/app/shared/components/molecules/notification/notification.component';
import { NotificationType } from 'src/app/shared/constants/enums';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly notificationSource = new Subject<Notification>();
  notification$ = this.notificationSource.asObservable();

  constructor() { }

  show(notification: Notification) {
    this.notificationSource.next(notification);
  }
}
