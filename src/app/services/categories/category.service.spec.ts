import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { HttpResponse } from '@angular/common/http';
import { Category, CategoryResponse } from 'src/app/interfaces/category.interface';
import { environment } from '../../../environments/environment';
import { Pagination } from 'src/app/interfaces/paginated.interface';


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

  it('should get categories and return the response', () => {
    // service.getCategories
    const mockResponse:Pagination<CategoryResponse> = {
      content: [
        {
          id: 1,
          name: 'Test Category',
          description: 'Test Description'
        }
      ],
      totalElements: 1,
      totalPages: 1,
      pageNumber: 0,
      pageSize: 5,
      last: true 
    }

    service.getCategories(0, 5, true).subscribe(response => {
      expect(response.content.length).toBe(1);
      expect(response.totalElements).toBe(1);
      expect(response.totalPages).toBe(1);
      expect(response.pageNumber).toBe(0);
      expect(response.pageSize).toBe(5);
      expect(response.last).toBe(true);
    });

    const req = httpMock.expectOne(environment.stock_service_url+"/category/?page=0&size=5&ord=true");
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${environment.auth_token}`);
    req.flush(mockResponse);
  });

});
