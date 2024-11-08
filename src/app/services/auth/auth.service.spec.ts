import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserLogin, UserLoginResponse } from 'src/app/interfaces/user.interface';
import { Roles } from '../../shared/roles';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {

    const mockRouter = {
      navigate: jest.fn()
    }

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService
        , { provide: Router, useValue: mockRouter }
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should login and return a jwt token', () => {
      const mockResponse: UserLoginResponse = {
        jwt: 'testToken'
      };

      const mockLogin: UserLogin = {
        email: 'test@gmail.com',
        password: 'test'
      }

      service.login(mockLogin).subscribe(response => {
        expect(response.jwt).toBe(mockResponse.jwt);
        expect(localStorage.getItem('token')).toBe(mockResponse.jwt);
        expect(service.getUserRole()).toContain(Roles);
      })

      const req = httpMock.expectOne(`${environment.auth_service_url}/auth/authenticate`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should return an error if login fails', () => {
      const mockLogin: UserLogin = {
        email: 'test@gmail.com',
        password: 'test'
      }

      service.login(mockLogin).subscribe(response => {
        expect(response).toBeTruthy();
        expect(localStorage.getItem('token')).toBeNull();
      });

      const req = httpMock.expectOne(`${environment.auth_service_url}/auth/authenticate`);
      expect(req.request.method).toBe('POST');
      req.flush('Invalid credentials', { status: 401, statusText: 'Unauthorized' });      

    });
  })

  describe('logout', () => {
    it('should remove token and navigate to login', () => {
      localStorage.setItem('token', 'fake-jwt-token');
      service.logout();
      expect(localStorage.getItem('token')).toBeNull();
      expect(service.getUserRole()).toBeNull();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if token exists', () => {
      localStorage.setItem('token', 'fake-jwt-token');
      expect(service.isLoggedIn()).toBe(true);
    });

    it('should return false if token does not exist', () => {
      localStorage.removeItem('token');
      expect(service.isLoggedIn()).toBe(false);
    });
  });

  describe('getUserRole', () => {
    const mockToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.' +
      'eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9BRE1JTiIsInN1YiI6IjMifQ.' +
      'xkrC68ie_kppIrWMhpvyuvpeoT2spQOeffAS3pi37j8';

    it('should return user role if token exists', () => {
      localStorage.setItem('token', mockToken);

      const role = service.getUserRole();

      expect(role).toBe(Roles.ADMIN);
    });

    it('should return null if token does not exist', () => {
      localStorage.removeItem('token');
      expect(service.getUserRole()).toBeNull();
    });
  });


});
