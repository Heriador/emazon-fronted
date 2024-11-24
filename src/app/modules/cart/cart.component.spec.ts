import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart/cart.service';
import { NotificationService } from '../../services/notification/notification.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SelectFieldComponent } from '../../shared/components/molecules/select-field/select-field.component';
import { InputFieldComponent } from '../../shared/components/molecules/input-field/input-field.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { CartItem, CartResponse } from 'src/app/shared/interfaces/cart.interface';
import { CART_ERROR_MESSAGES_BY_CODE, CART_RESPONSE_MESSAGES } from '../../shared/constants/cart-constants';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jest.Mocked<CartService>;
  let notificationService: jest.Mocked<NotificationService>;

  const mockCartItem: CartItem = {
    id: 1,
    name: 'Test Item',
    price: 100,
    stock: 10,
    brand: { id: 1, name: 'Test Brand', description: 'Test Description' },
    categories: [{ id: 1, name: 'Test Category', description: 'Test Description' }],
    nextSupplyDate: '2021-10-01',
    cartQuantity: 1,
    cartPrice: 100
  }

  const mockResponse: CartResponse = {
    content: [mockCartItem],
    pageNumber: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
    totalPrice: 0,
    last: false
  }

  beforeEach(async () => {
    cartService = {
      getCartItems: jest.fn().mockReturnValue(of({ body: { content: [], totalElements: 0, totalPages: 0, totalPrice: 0 } })),
      deleteItemFromCart: jest.fn().mockReturnValue(of({ status: HttpStatusCode.Ok }))
    } as unknown as jest.Mocked<CartService>;

    notificationService = {
      show: jest.fn()
    } as unknown as jest.Mocked<NotificationService>;

    await TestBed.configureTestingModule({
      declarations: [ CartComponent, SelectFieldComponent, InputFieldComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: CartService, useValue: cartService },
        { provide: NotificationService, useValue: notificationService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls', () => {
    expect(component.filterForm).toBeDefined();
    expect(component.filterForm.get('filterBy')).toBeDefined();
    expect(component.filterForm.get('filterString')).toBeDefined();
  });

  describe('getCartItems', () => {

    it('should get cart items on init', () => {
      
  
      jest.spyOn(cartService, 'getCartItems').mockReturnValueOnce(of({status: 200,body: mockResponse} as HttpResponse<CartResponse>));

      component.ngOnInit();

      expect(cartService.getCartItems).toBeCalledTimes(2);
      expect(component.cartItems).toEqual(mockResponse.content);
      expect(component.totalPrice).toEqual(mockResponse.totalPrice);

      
    });

    it('should show error notification if response status is not 200', () => {

      jest.spyOn(cartService, 'getCartItems')
        .mockReturnValueOnce(of({status: 201,body: mockResponse} as HttpResponse<CartResponse>));

      component.ngOnInit();

      expect(cartService.getCartItems).toBeCalledTimes(2);
      expect(notificationService.show).toBeCalledWith({message: CART_RESPONSE_MESSAGES.UNEXPECTED_RESPONSE, type: 'error'});

    })

    it('should show error notification if getCartItems throws error', () => {

      const mockResponse = new HttpResponse({ status: HttpStatusCode.BadRequest });

      jest.spyOn(cartService, 'getCartItems').mockReturnValue(throwError(() => mockResponse))

      component.ngOnInit();

      expect(cartService.getCartItems).toBeCalledTimes(2);
      expect(notificationService.show).toBeCalledWith({
        message: CART_ERROR_MESSAGES_BY_CODE[HttpStatusCode.BadRequest],
        type: 'error'
      })

    });

  })


  describe('deleteItem', () => {

    it('should delete item from cart', () => {
      jest.spyOn(cartService, 'deleteItemFromCart')
      .mockReturnValueOnce(of({ status: HttpStatusCode.Ok } as HttpResponse<any>));

      component.deleteItem(1);

      expect(cartService.deleteItemFromCart).toBeCalledWith(1);
      expect(cartService.getCartItems).toBeCalledTimes(2);
    })

    it('should show error notification if deleteItemFromCart throws error', () => {
      const mockResponse = new HttpResponse({ status: HttpStatusCode.BadRequest });

      jest.spyOn(cartService, 'deleteItemFromCart').mockReturnValue(throwError(() => mockResponse));

      component.deleteItem(1);

      expect(cartService.deleteItemFromCart).toBeCalledWith(1);
      expect(notificationService.show).toBeCalledWith({
        message: CART_ERROR_MESSAGES_BY_CODE[HttpStatusCode.BadRequest],
        type: 'error'
      });

    });

  })

  describe('Pagination Functions', () => {
      
      it('should change page to next', () => {
        component.page = 0;
        component.totalPages = 2;
  
        component.nextPage();
  
        expect(component.page).toEqual(1);
  
      });
  
      it('should not change page to next if it is the last page', () => {
        component.page = 1;
        component.totalPages = 2;
  
        component.nextPage();
  
        expect(component.page).toEqual(1);
  
      });
  
      it('should change page to previous', () => {
        component.page = 1;
        component.totalPages = 2;
  
        component.previousPage();
  
        expect(component.page).toEqual(0);
  
      });
  
      it('should not change page to previous if it is the first page', () => {
        component.page = 0;
        component.totalPages = 2;
  
        component.previousPage();
  
        expect(component.page).toEqual(0);
  
      });
  
      it('should change size', () => {
        const event = {
          target: {
            value: 10
          }
        } as unknown as Event;
  
        component.changeSize(event);
  
        expect(component.size).toEqual(10);
  
      });

      it('should change asc', () => {
        component.isAsc = false;

        component.changeAsc();

        expect(component.isAsc).toBeTruthy();
      });
  })

  describe('Filter Functions', () => {
      
  
      it('should filter by brand', () => {
        component.filterForm.get('filterBy')?.setValue('brand');
        component.filterForm.get('filterString')?.setValue('Test Brand');
  
        jest.spyOn(cartService, 'getCartItems').mockReturnValue(of({status: 200,body: mockResponse} as HttpResponse<CartResponse>));
        
        component.changeFilter();
 
        expect(component.cartItems).toEqual([mockCartItem]);
  
      });
  
      it('should filter by category', () => {
        component.filterForm.get('filterBy')?.setValue('category');
        component.filterForm.get('filterString')?.setValue('Test Category');

        jest.spyOn(cartService, 'getCartItems').mockReturnValueOnce(of({status: 200,body: mockResponse} as HttpResponse<CartResponse>));
  
        component.changeFilter();
  
        expect(component.cartItems).toEqual([mockCartItem]);
  
      });  


      it('should be filter by empty string', () => {
        

        jest.spyOn(cartService, 'getCartItems').mockReturnValueOnce(of({status: 200,body: mockResponse} as HttpResponse<CartResponse>));
  
        component.changeFilter();
  
        expect(component.cartItems).toEqual([mockCartItem]);
      });

  });

  describe('getCategoriesNames', () => {
    it('should return an array with the categories names', () => {
      const categories = [
        { id: 1, name: 'Test Category 1', description: 'Test Description' },
        { id: 2, name: 'Test Category 2', description: 'Test Description' }
      ];

      const result = component.getCategoriesNames(categories);

      expect(result).toEqual('Test Category 1, Test Category 2');
    });
  })

  describe('getNextSupplyDate', () => {
    it('should return the next supply date', () => {
      const result = component.getNextSupplyDate('2021-10-01');

      expect(result).toEqual('30/9/2021');
    });

    it('should return a message if the date is invalid', () => {
      const result = component.getNextSupplyDate('');

      expect(result).toEqual('Sin proxima fecha de entega');
    });
  })

});
