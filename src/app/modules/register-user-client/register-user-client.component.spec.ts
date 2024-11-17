import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserClientComponent } from './register-user-client.component';
import { UsersService } from '../../services/user/users.service';
import { NotificationService } from '../../services/notification/notification.service';
import { InputFieldComponent } from '../../shared/components/molecules/input-field/input-field.component';
import { FormBuilder } from '@angular/forms';
import { NotificationType } from '../../shared/constants/enums';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { GENERIC_ERROR_MESSAGE, USER_ERROR_MESSAGES, USER_ERROR_MESSAGES_BY_CODE, USER_FIELD_NAMES, USER_RESPONSE_MESSAGE } from '../../shared/constants/user-constant';
import { of, throwError } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user.interface';

describe('RegisterUserClientComponent', () => {
  let component: RegisterUserClientComponent;
  let fixture: ComponentFixture<RegisterUserClientComponent>;
  let userService: UsersService;
  let notificationService: NotificationService;

  beforeEach(async () => {

    userService = {
      createUserClient: jest.fn()
    } as unknown as jest.Mocked<UsersService>;

    notificationService = {
      show: jest.fn()
    } as unknown as jest.Mocked<NotificationService>;

    await TestBed.configureTestingModule({
      declarations: [ RegisterUserClientComponent, InputFieldComponent ],
      providers: [ FormBuilder,
        { provide: UsersService, useValue: userService },
        { provide: NotificationService, useValue: notificationService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterUserClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return empty string if no error', () => {
    const error = component.getErrorMessage(null, 'test');
    expect(error).toEqual('');
  });

  it('should return empty string if control is valid', () => {
    const control = component.name;

    control?.markAllAsTouched();
    control?.setErrors(null);

    const errorMessage = component.getErrorMessage(control, USER_FIELD_NAMES.USER_NAME[1]);
    expect(errorMessage).toBe('');
  });

  it('should return error message if control is invalid', () => {
    const control = component.name;

    control?.markAllAsTouched();
    control?.setErrors({ required: true });

    const errorMessage = component.nameErrorMessage;
    expect(errorMessage).toBe(USER_ERROR_MESSAGES.required(USER_FIELD_NAMES.USER_NAME[1]));
  });

  it('should not create item if form is invalid', () => {
    component.registerForm.setErrors({ invalid: true });
    component.onSubmit();

    expect(component.registerForm.touched).toBe(true);
    expect(userService.createUserClient).not.toHaveBeenCalled();
    expect(notificationService.show).not.toHaveBeenCalled();
  })

  it('should create a warehouse assistant succesfully', () => {
    const user: User = {
      name: 'Test',
      lastName: 'User',
      email: 'test@gmail.com',
      password: 'testpassword',
      identityDocument: '12345678',
      phone: '1234567890',
      birthDate: "2001-04-22"
    }

    const formatedUser: User = {
      ...user,
      birthDate: "22/04/2001"
    }

    const mockResponse = new HttpResponse<User>({status: HttpStatusCode.Created, body: user});

    jest.spyOn(userService, 'createUserClient').mockReturnValueOnce(of(mockResponse));

    component.registerForm.setValue(user);
    console.log(component.registerForm.errors)
    console.log(component.registerForm.valid)

    component.onSubmit();

    expect(userService.createUserClient).toHaveBeenCalledWith(formatedUser);
    expect(userService.createUserClient).toHaveBeenCalledTimes(1);
    expect(notificationService.show).toHaveBeenCalledWith({
      message: USER_RESPONSE_MESSAGE.CLIENT_USER_CREATED,
      type: NotificationType.SUCCESS
    })
    expect(notificationService.show).toHaveBeenCalledTimes(1);

  });

  it('should show error message when create item unexpected response', () => {
    const user: User = {
      name: 'Test',
      lastName: 'User',
      email: 'test@gmail.com',
      password: 'testpassword',
      identityDocument: '12345678',
      phone: '1234567890',
      birthDate: "2001-04-22"
    }

    const formatedUser: User = {
      ...user,
      birthDate: "22/04/2001"
    }

    const mockResponse = new HttpResponse<User>({
      status: HttpStatusCode.Ok,
      body: user
    })

    jest.spyOn(userService, 'createUserClient').mockReturnValueOnce(of(mockResponse));

    component.registerForm.setValue(user);

    component.onSubmit();

    expect(userService.createUserClient).toHaveBeenCalledWith(formatedUser);
    expect(userService.createUserClient).toHaveBeenCalledTimes(1);
    expect(notificationService.show).toHaveBeenCalledWith({
      message: USER_RESPONSE_MESSAGE.UNEXPECTED_RESPONSE,
      type: NotificationType.ERROR
    })

  })

  it('should show error message when create item failed', () => {

    const user: User = {
      name: 'Test',
      lastName: 'User',
      email: 'test@gmail.com',
      password: 'testpassword',
      identityDocument: '12345678',
      phone: '1234567890',
      birthDate: "2001-04-22"
    }

    const formatedUser: User = {
      ...user,
      birthDate: "22/04/2001"
    }

    const errorResponse = new HttpResponse({
      status: HttpStatusCode.Conflict
    })

    jest.spyOn(userService, 'createUserClient').mockReturnValueOnce(throwError(() => errorResponse));

    component.registerForm.setValue(user);

    component.onSubmit();

    expect(userService.createUserClient).toHaveBeenCalledWith(formatedUser);
    expect(userService.createUserClient).toHaveBeenCalledTimes(1);
    expect(notificationService.show).toHaveBeenCalledWith({
      message: USER_ERROR_MESSAGES_BY_CODE[HttpStatusCode.Conflict],
      type: NotificationType.ERROR
    })
    expect(notificationService.show).toHaveBeenCalledTimes(1);

  });

  it('should show error message when create item failed', () => {

    const user: User = {
      name: 'Test',
      lastName: 'User',
      email: 'test@gmail.com',
      password: 'testpassword',
      identityDocument: '12345678',
      phone: '1234567890',
      birthDate: "2001-04-22"
    }

    const formatedUser: User = {
      ...user,
      birthDate: "22/04/2001"
    }

    const errorResponse = new HttpResponse({
      status: HttpStatusCode.NotImplemented
    })

    jest.spyOn(userService, 'createUserClient').mockReturnValueOnce(throwError(() => errorResponse));

    component.registerForm.setValue(user);

    component.onSubmit();

    expect(userService.createUserClient).toHaveBeenCalledWith(formatedUser);
    expect(userService.createUserClient).toHaveBeenCalledTimes(1);
    expect(notificationService.show).toHaveBeenCalledWith({
      message: GENERIC_ERROR_MESSAGE,
      type: NotificationType.ERROR
    })
    expect(notificationService.show).toHaveBeenCalledTimes(1);

  });

});
