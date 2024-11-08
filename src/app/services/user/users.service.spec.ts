import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../../interfaces/user.interface';
import { environment } from '../../../environments/environment';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a warehouse assistant and return the response', () => {
    const user: User = {
      name: 'Test',
      lastName: 'User',
      email: 'test@gmail.com',
      password: 'testpassword',
      identityDocument: '12345678',
      phone: '1234567890',
      birthDate: "22/04/2001"
    }

    const mockResponse = {
      status: 201,
      statusText: 'Created'
    }

    service.createWarehouseAssis(user).subscribe(response => {
      expect(response.status).toBe(201);
      expect(response.statusText).toBe('Created');
    });

    const req = httpMock.expectOne(environment.auth_service_url+"/users/warehouse-assistant");
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${environment.auth_token}`);

  });
});
