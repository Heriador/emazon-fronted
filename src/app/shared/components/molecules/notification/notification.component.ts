import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconType, NotificationType, TextType } from '../../../constants/enums';
import { NotificationService } from '../../../../core/services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  TextType = TextType;
  NotificationType = NotificationType;

  message: string = '';
  isVisible: boolean = false;
  type: NotificationType = NotificationType.INFO;
  iconType = IconType[this.type];
 
  


  constructor(private readonly notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.notification$.subscribe((res: Notification) => {
      this.message = res.message;
      this.type = res.type;
      this.iconType = IconType[this.type];
      this.isVisible = true;

      setTimeout(() => {
        this.close();
      }, 30000);
    })
  }

  close(){
    this.isVisible = false;
  }

}

export interface Notification{
  message: string;
  type: NotificationType;
}
