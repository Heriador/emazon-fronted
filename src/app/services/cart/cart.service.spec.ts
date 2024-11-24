import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartRequest } from 'src/app/shared/interfaces/cart.interface';
import { environment } from '../../../environments/environment';
import { HttpParams } from '@angular/common/http';

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

  describe('deleteItemFromCart', () => {
      
      it('should delete item from cart and return the response', () => {
        // service.deleteItemFromCart
        const itemId = 1;
        const mockResponse = {
          status: 200,
          statusText: 'OK'
        }
  
        service.deleteItemFromCart(itemId).subscribe(response => {
          expect(response.status).toBe(200);
          expect(response.statusText).toBe('OK');
        });
  
        const req = httpMock.expectOne(`${environment.cart_service_url}/delete-item/${itemId}`);
        expect(req.request.method).toBe('DELETE');
        req.flush(mockResponse);
      });
  });

  describe('getCartItems', () => {
      
      it('should get cart items and return the response', () => {
        // service.getCartItems
        const page = 0;
        const size = 5;
        const order = true;
        const categoryName = '';
        const brandName = '';
        const mockResponse = {
          status: 200,
          statusText: 'OK'
        }
  
        service.getCartItems(page, size, order, categoryName, brandName).subscribe(response => {
          expect(response.status).toBe(200);
          expect(response.statusText).toBe('OK');
        });

        httpMock.match(`${environment.cart_service_url}/get-cart`).forEach(req => {
          console.log(req)
        });
  
        const req = httpMock
          .expectOne(
            `${environment.cart_service_url}/get-cart?page=${page}&size=${size}&order=${order}`
          );
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
      });


      it('should get cart items with category filter and return the response', () => {
        // service.getCartItems
        const page = 0;
        const size = 5;
        const order = true;
        const categoryName = 'category';
        const brandName = '';
        const mockResponse = {
          status: 200,
          statusText: 'OK'
        }

        let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
        .set('order', order.toString())
        .set('filterByCategoryName', categoryName)
      
  
        service.getCartItems(page, size, order, categoryName, brandName).subscribe(response => {
          expect(response.status).toBe(200);
          expect(response.statusText).toBe('OK');
        });

        httpMock.match(`${environment.cart_service_url}/get-cart`).forEach(req => {
          console.log(req)
        });
  
        const req = httpMock
          .expectOne(
            `${environment.cart_service_url}/get-cart?page=${page}&size=${size}&order=${order}&filterByCategoryName=${categoryName}`
          );
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
      });

      it('should get cart items with brand filter and return the response', () => {
        // service.getCartItems
        const page = 0;
        const size = 5;
        const order = true;
        const categoryName = '';
        const brandName = 'brand';
        const mockResponse = {
          status: 200,
          statusText: 'OK'
        }
  
        service.getCartItems(page, size, order, categoryName, brandName).subscribe(response => {
          expect(response.status).toBe(200);
          expect(response.statusText).toBe('OK');
        });

        httpMock.match(`${environment.cart_service_url}/get-cart`).forEach(req => {
          console.log(req)
        });
  
        const req = httpMock
          .expectOne(
            `${environment.cart_service_url}/get-cart?page=${page}&size=${size}&order=${order}&filterByBrandName=${brandName}`
          );
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
      });

  });

});
