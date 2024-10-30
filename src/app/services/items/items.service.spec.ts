import { TestBed } from '@angular/core/testing';

import { ItemsService } from './items.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Item, ItemResponse } from 'src/app/interfaces/item.interface';
import { environment } from '../../../environments/environment';
import { Pagination } from 'src/app/interfaces/paginated.interface';

describe('ItemsService', () => {
  let service: ItemsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemsService]
    });
    service = TestBed.inject(ItemsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an item and return the response', () => {
    // service.createItem
    const item: Item = {
      name: 'Test Item',
      description: 'Test Description',
      price: 100,
      stock: 10,
      brandId: 1,
      categories: [1, 2]

    };
    const mockResponse = {
      status: 201,
      statusText: 'Created'
    }

    service.createItem(item).subscribe(response => {
      expect(response.status).toBe(201);
      expect(response.statusText).toBe('Created');
    });

    const req = httpMock.expectOne(environment.stock_service_url+"/item/");
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${environment.auth_token}`);
    expect(req.request.body).toEqual(item);
    req.flush(mockResponse);
  });

  it('should get items and return the response', () => {
    const mockResponse = {
      content: [
        {
          id: 1,
          name: 'Test Item',
          description: 'Test Description',
          price: 100,
          stock: 10,
          brandId: 1,
          categories: [1, 2]
        }
      ],
      totalPages: 1,
      totalElements: 1,
      last: true,
      size: 1,
      number: 0,
    }

    service.getItems(0, 1, 'name', true).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.stock_service_url}/item/?page=0&size=1&sortBy=name&ord=true`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${environment.auth_token}`);
    req.flush(mockResponse);
  });

});
