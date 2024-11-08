import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from '../../core/services/notification/notification.service';
import { InputFieldComponent } from '../../shared/components/molecules/input-field/input-field.component';
import { UserLogin, UserLoginResponse } from 'src/app/interfaces/user.interface';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { NotificationType } from '../../shared/constants/enums';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jest.Mocked<AuthService>
  let notificationService: jest.Mocked<NotificationService>
  let router: Router;

  beforeEach(async () => {

    authService = {
      login: jest.fn()
    } as unknown as jest.Mocked<AuthService>;

    notificationService = {
      show: jest.fn()
    } as unknown as jest.Mocked<NotificationService>;

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent, InputFieldComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [ FormBuilder,
        { provide: AuthService, useValue: authService },
        { provide: NotificationService, useValue: notificationService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return empty string if no email error', () => {
    const error = component.emailErrorMessage;
    expect(error).toEqual('');
  });

  it('should return empty string if no password error', () => {
    const error = component.passwordErrorMessage;
    expect(error).toEqual('');
  });

  it('should return email is required if email is empty', () => {
    component.email?.markAllAsTouched();
    component.email?.setErrors({required: true});
    const error = component.emailErrorMessage;
    expect(error).toEqual('Email is required');
  });

  it('should return invalid email if email is invalid', () => {
    component.email?.markAllAsTouched();
    component.email?.setErrors({email: true});
    const error = component.emailErrorMessage;
    expect(error).toEqual('Invalid email');
  });

  it('should return password is required if password is empty', () => {
    component.password?.markAllAsTouched();
    component.password?.setErrors({required: true});
    const error = component.passwordErrorMessage;
    expect(error).toEqual('Password is required');
  });

  it('should not call login if form is invalid', () => {
    const loginSpy = jest.spyOn(authService, 'login');
    component.onSubmit();
    expect(loginSpy).not.toHaveBeenCalled();
  });

  it('should call login and return a jwt token', () => {
    const mockResponse: UserLoginResponse = {
      jwt: 'test'
    }
    const mockLogin: UserLogin = {
      email: 'test@gmail.com',
      password: 'testpassword'
    }

    jest.spyOn(router, 'navigate')
    jest.spyOn(authService, 'login').mockReturnValue(of(mockResponse)); 
  
    component.loginForm.setValue(mockLogin);

    component.onSubmit();
    expect(authService.login).toBeCalledTimes(1);
    expect(authService.login).toBeCalledWith(mockLogin);
    expect(router.navigate).toBeCalledTimes(1);
    expect(router.navigate).toBeCalledWith(['/dashboard']);
  });

  it('should show error message if login fails', () => {
    const mockLogin: UserLogin = {
      email: 'test@gmail.com',
      password: 'testpassword'
    }

    const errorMessage = new HttpErrorResponse({ status: HttpStatusCode.Unauthorized })
    jest.spyOn(authService, 'login').mockReturnValue(throwError(() => errorMessage));

    component.loginForm.setValue(mockLogin);
    component.onSubmit();

    expect(authService.login).toBeCalledTimes(1);
    expect(authService.login).toBeCalledWith(mockLogin);

    expect(notificationService.show).toBeCalledTimes(1);
    expect(notificationService.show).toBeCalledWith({
      message: 'Invalid email or password',
      type: NotificationType.ERROR
    });

  });
});
