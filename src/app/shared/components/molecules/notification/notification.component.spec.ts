import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { of } from 'rxjs';
import { IconType, NotificationType } from '../../../constants/enums';


describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let notificationService: NotificationService;

  beforeEach(async () => {

    const notificationServiceMock = {
      notification$: of({message: 'message', type: NotificationType.INFO})
    };

    await TestBed.configureTestingModule({
      declarations: [ NotificationComponent ],
      providers: [
        { provide: NotificationService, useValue: notificationServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close notification', () => {
    jest.useFakeTimers();
    component.close();
    jest.advanceTimersByTime(500);
    expect(component.isVisible).toBe(false);
  });

  it('should subscribe to notification service', () => {
    const spy = jest.spyOn(notificationService.notification$, 'subscribe');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled
  });

  it('should update message and type on notification', () => {
    component.ngOnInit();
    expect(component.message).toBe('message');
    expect(component.type).toBe(NotificationType.INFO);
    expect(component.iconType).toBe(IconType[NotificationType.INFO]);
    expect(component.isVisible).toBe(true);
  })

  it('should close notification after 30 seconds', () => {
    jest.useFakeTimers();
    component.ngOnInit();
    jest.advanceTimersByTime(3500);
    expect(component.isVisible).toBe(false);
  })

});
