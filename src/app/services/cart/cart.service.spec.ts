import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartRequest } from 'src/app/shared/interfaces/cart.interface';
import { environment } from '../../../environments/environment';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService]

    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addItemToCart', () => {

    it('should add item to cart and return the response', () => {
      // service.addItemToCart
      const cartRequest: CartRequest = {
        itemId: 1,
        quantity: 1
      };
      const mockResponse = {
        status: 201,
        statusText: 'Created'
      }

      service.addItemToCart(cartRequest).subscribe(response => {
        expect(response.status).toBe(201);
        expect(response.statusText).toBe('Created');
      });

      const req = httpMock.expectOne(`${environment.cart_service_url}/add-product`);
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.body).toEqual(cartRequest);
      req.flush(mockResponse);
    });

  });

});
