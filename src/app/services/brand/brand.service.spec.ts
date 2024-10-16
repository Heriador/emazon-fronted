import { TestBed } from '@angular/core/testing';

import { BrandService } from './brand.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrandService]
    });
    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a brand and return the response', () => {
    // service.createBrand
    const brand = {
      name: 'Test Brand',
      description: 'Test Description'
    };
    const mockResponse = {
      status: 201,
      statusText: 'Created'
    }

    service.createBrand(brand).subscribe(response => {
      expect(response.status).toBe(201);
      expect(response.statusText).toBe('Created');
    });

    const req = httpMock.expectOne(environment.stock_service_url+"/brand/");
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${environment.auth_token}`);
    expect(req.request.body).toEqual(brand);
    req.flush(mockResponse);
  })

  it('should get brands and return the response', () => {
    const mockResponse = {
      content: [
        {
          id: 1,
          name: 'Test Brand',
          description: 'Test Description'
        }
      ],
      totalPages: 1,
      totalElements: 1,
      last: true,
      size: 1,
      number: 0,
    }

    service.getBrands(0, 5, true).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.stock_service_url+"/brand/?page=0&size=5&ord=true");
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${environment.auth_token}`);
    req.flush(mockResponse);

  });

  

});
