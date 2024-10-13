import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { Category } from 'src/app/interfaces/category.interface';
import { environment } from '../../../environments/environment';


describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a category and return the response', () => {
    // service.createCategory
    const category:Category = {
      name: 'Test Category',
      description: 'Test Description'
    };
    const mockResponse: HttpResponse<Category> = new HttpResponse({
      status: 201,
      statusText: 'Created'
    }) 

    service.createCategory(category).subscribe(response => {
      expect(response.status).toBe(201);
      expect(response.statusText).toBe('Created');
    });

    const req = httpMock.expectOne(environment.stock_service_url+"/category/");
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${environment.auth_token}`);
    expect(req.request.body).toEqual(category);
    req.event(mockResponse);
  });

});
