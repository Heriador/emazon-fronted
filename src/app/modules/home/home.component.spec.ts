import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ItemsService } from '../../services/items/items.service';
import { NotificationService } from '../../services/notification/notification.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { Pagination } from 'src/app/shared/interfaces/paginated.interface';
import { ItemResponse } from 'src/app/shared/interfaces/item.interface';
import { of, throwError } from 'rxjs';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { ERROR_MESSAGES_BY_CODE, GENERIC_ERROR_MESSAGE } from '../../shared/constants/item-constants';
import { NotificationType } from '../../shared/constants/enums';
import { CategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { CartRequest } from 'src/app/shared/interfaces/cart.interface';
import { CartService } from '../../services/cart/cart.service';
import { CART_GENERIC_ERROR_MESSAGE, CART_RESPONSE_MESSAGES } from '../../shared/constants/cart-constants';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let itemService: jest.Mocked<ItemsService>;
  let notificationService: jest.Mocked<NotificationService>;
  let cartService: jest.Mocked<CartService>;


  beforeEach(async () => {

    itemService = {
      getItems: jest.fn().mockReturnValue({ subscribe: jest.fn() })
    } as unknown as jest.Mocked<ItemsService>;

    notificationService = {
      show: jest.fn()
    } as unknown as jest.Mocked<NotificationService>;

    cartService = {
      addItemToCart: jest.fn().mockReturnValue({ subscribe: jest.fn() })
    } as unknown as jest.Mocked<CartService>;

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [HttpClientTestingModule],
      providers:[
        FormBuilder,
        { provide: ItemsService, useValue: itemService },
        { provide: NotificationService, useValue: notificationService },
        { provide: CartService, useValue: cartService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('get Items', () => {
    it('should get items, categories and brands on init', () => {
  
      const mockItemResponse: Pagination<ItemResponse> = {
        content: [
          { 
            id: 1,
            name: 'test', 
            description: 'test', 
            price: 100, 
            stock: 10, 
            categories: [
              {
                id: 1,
                name: 'test',
                description: 'test'
              },
              {
                id: 2,
                name: 'test_2',
                description: 'test'
              }
            ], 
            brand: {
              id: 1,
              name: 'test_brand',
              description: 'test'
            }
          }
        ],
        totalElements: 1,
        totalPages: 1,
        pageNumber: 0,
        pageSize: 5,
        last: true
      }
  
      jest.spyOn(itemService, 'getItems').mockReturnValue(of(mockItemResponse));
  
      component.ngOnInit();
  
      expect(itemService.getItems).toBeCalledTimes(2);
      expect(component.items).toEqual(mockItemResponse);
  
  
    });
  
    it('should show error message when get items error', () => {
      const errorResponse = new HttpResponse({ status: HttpStatusCode.NotFound });
      jest.spyOn(itemService, 'getItems').mockReturnValue(throwError(() => errorResponse));
  
      component.ngOnInit();
  
      expect(itemService.getItems).toBeCalledTimes(2);
      expect(notificationService.show).toHaveBeenCalledWith({
        message: ERROR_MESSAGES_BY_CODE[HttpStatusCode.NotFound] || GENERIC_ERROR_MESSAGE,
        type: NotificationType.ERROR
      });
    });

    it('should show generic error message when get items error and status is not found', () => {
      const errorResponse = new HttpResponse({ status: HttpStatusCode.BadGateway });
      jest.spyOn(itemService, 'getItems').mockReturnValue(throwError(() => errorResponse));
  
      component.ngOnInit();
  
      expect(itemService.getItems).toBeCalledTimes(2);
      expect(notificationService.show).toHaveBeenCalledWith({
        message: GENERIC_ERROR_MESSAGE,
        type: NotificationType.ERROR
      });
    });

  });

  describe('parsePrice', () => {
    it('should parse price and return a string', () => {
      const price = 100;
      const priceString = component.parsePrice(price);
      expect(priceString).toBe('$100,00');
    });
  });

  describe('getCategoriesNames', () => {
    it('should get categories names and return a string array', () => {
      const categories: CategoryResponse[] = [
        { id: 1, name: 'test', description: 'test' },
        { id: 2, name: 'test_2', description: 'test' }
      ];
      const categoriesString = component.getCategoriesNames(categories);
      expect(categoriesString).toEqual(['test', 'test_2']);
    });
  }) 

  describe('Pagination Controls', () => {
    it('should change size', () => {
      const event = {
        target: {
          value: '10'
        }
      } as unknown as Event;
  
      component.changeSize(event);
  
      expect(component.size).toBe(10);
    });
  
    it('should change sort param', () => {
      const event = {
        target: {
          value: 'name'
        }
      } as unknown as Event;
  
      component.changeSortParam(event);
  
      expect(component.sortParam).toBe('name');
    });
  
    it('should change asc', () => {
      component.isAsc = true;
      component.changeAsc();
      expect(component.isAsc).toBe(false);
    });
  
    it('should change page to previous', () => {
      component.page = 1;
      component.previousPage();
      expect(component.page).toBe(0);
    });
  
    it('should not change page to previous if page is 0', () => {
      component.page = 0;
      component.previousPage();
      expect(component.page).toBe(0);
    });
  
    it('should change page to next', () => {
      component.items = {
        last: false
      } as Pagination<ItemResponse>;
  
      component.page = 0;
      component.nextPage();
      expect(component.page).toBe(1);
    });
  
    it('should not change page to next if last page', () => {
      component.items = {
        last: true
      } as Pagination<ItemResponse>;
  
      component.page = 0;
      component.nextPage();
      expect(component.page).toBe(0);
    });
  })

  describe('addItemToCart', () => {

    it('should add item to cart and show success message', () => {
      const mockCartRequest: CartRequest = {
        itemId: 1,
        quantity: 1
      }

      const mockResponse = new HttpResponse({ status: HttpStatusCode.Created, body: mockCartRequest });

      jest.spyOn(cartService, 'addItemToCart').mockReturnValue(of(mockResponse));

      component.addItemToCart(mockCartRequest);

      expect(cartService.addItemToCart).toBeCalledTimes(1);
      expect(notificationService.show).toBeCalledWith({
        message: CART_RESPONSE_MESSAGES.ITEM_ADDED,
        type: NotificationType.SUCCESS
      })

    });

    it('should show error message if response status is not 201', () => {
      const mockCartRequest: CartRequest = {
        itemId: 1,
        quantity: 1
      }

      const mockResponse = new HttpResponse({ status: HttpStatusCode.Ok, body: mockCartRequest });

      jest.spyOn(cartService, 'addItemToCart').mockReturnValue(of(mockResponse));

      component.addItemToCart(mockCartRequest);

      expect(cartService.addItemToCart).toBeCalledTimes(1);
      expect(notificationService.show).toBeCalledWith({
        message: CART_RESPONSE_MESSAGES.UNEXPECTED_RESPONSE,
        type: NotificationType.ERROR
      })
    });

    it('should show error message if addItemToCart throws error', () => {

      const mockerror = {
        status: HttpStatusCode.BadRequest,
        error:{
          message: 'error'
        }        
      }

      jest.spyOn(cartService, 'addItemToCart').mockReturnValue(throwError(() => mockerror));

      component.addItemToCart({ itemId: 1, quantity: 1 });

      expect(cartService.addItemToCart).toBeCalledTimes(1);
      expect(notificationService.show).toBeCalledWith({
        message: mockerror.error.message,
        type: NotificationType.ERROR
      })

    });

    it('should show generic error message if error message is not provided', () => {
          
      const mockerror = {
        status: HttpStatusCode.BadRequest,
        error:{
          message: ''
        }        
      }

      jest.spyOn(cartService, 'addItemToCart').mockReturnValue(throwError(() => mockerror));

      component.addItemToCart({ itemId: 1, quantity: 1 });

      expect(cartService.addItemToCart).toBeCalledTimes(1);
      expect(notificationService.show).toBeCalledWith({
        message: CART_GENERIC_ERROR_MESSAGE,
        type: NotificationType.ERROR
      });
    });

  })

});
