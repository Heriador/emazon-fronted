import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { Notification } from 'src/app/shared/components/molecules/notification/notification.component';
import { NotificationType } from '../../../shared/constants/enums';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a notification when show is called', () => {
    const testNotification: Notification = {
      message: 'Test Message',
      type: NotificationType.SUCCESS
    }

    service.notification$.subscribe(notification => {
      expect(notification).toEqual(testNotification);
    });

    service.show(testNotification);
  })
});
