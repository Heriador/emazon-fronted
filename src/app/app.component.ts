import { Component, OnInit } from '@angular/core';
import { NotificationService } from './core/services/notification/notification.service';
import { NotificationType } from './shared/constants/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'emazon-frontend';
}
