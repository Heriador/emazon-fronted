import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsComponent } from './items.component';
import { ItemsService } from '../../../../../services/items/items.service';
import { CategoryService } from '../../../../../services/categories/category.service';
import { BrandService } from '../../../../../services/brand/brand.service';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { 
  ERROR_MESSAGES, 
  ERROR_MESSAGES_BY_CODE, 
  FIELD_NAMES, 
  GENERIC_ERROR_MESSAGE, 
  RESPONSE_MESSAGE 
} from '../../../../../shared/constants/item-constants';

import {
  ERROR_MESSAGES_BY_CODE as CATEGORY_ERROR_MESSAGES_BY_CODE,
  ERROR_MESSAGES as CATEGORY_ERROR_MESSAGES,
} from '../../../../../shared/constants/category-constant';

import {
  ERROR_MESSAGES_BY_CODE as BRAND_ERROR_MESSAGES_BY_CODE,
  ERROR_MESSAGES as BRAND_ERROR_MESSAGES,
} from '../../../../../shared/constants/brand-constant';

import { NotificationType } from '../../../../../shared/constants/enums';
import { of, throwError } from 'rxjs';
import { Item, ItemResponse } from 'src/app/interfaces/item.interface';
import { InputFieldComponent } from '../../../../../shared/components/molecules/input-field/input-field.component';
import { SelectFieldComponent } from '../../../../../shared/components/molecules/select-field/select-field.component';
import { MultiSelectFieldComponent } from '../../../../../shared/components/molecules/multi-select-field/multi-select-field.component';
import { TextareaFieldComponent } from '../../../../../shared/components/molecules/textarea-field/textarea-field.component';
import { Pagination } from 'src/app/interfaces/paginated.interface';
import { CategoryResponse } from 'src/app/interfaces/category.interface';
import { BrandResponse } from 'src/app/interfaces/brand.interface';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let itemService: jest.Mocked<ItemsService>;
  let categoryService: jest.Mocked<CategoryService>;
  let brandService: jest.Mocked<BrandService>;
  let notificationService: jest.Mocked<NotificationService>;

  beforeEach(async () => {

    itemService = {
      createItem: jest.fn(),
      getItems: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
    } as unknown as jest.Mocked<ItemsService>;

    categoryService = {
      getCategories: jest.fn().mockReturnValue({ subscribe: jest.fn() })
    } as unknown as jest.Mocked<CategoryService>;

    brandService = {
      getBrands: jest.fn().mockReturnValue({ subscribe: jest.fn() })
    } as unknown as jest.Mocked<BrandService>;

    notificationService = {
      show: jest.fn()
    } as unknown as jest.Mocked<NotificationService>;

    await TestBed.configureTestingModule({
      declarations: [ ItemsComponent, InputFieldComponent, TextareaFieldComponent ,SelectFieldComponent, MultiSelectFieldComponent ],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder,
        {provide: ItemsService, useValue: itemService},
        {provide: CategoryService, useValue: categoryService},
        {provide: BrandService, useValue: brandService},
        {provide: NotificationService, useValue: notificationService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should get items, categories and brands on init', () => {
    const mockCategoryResponse: Pagination<CategoryResponse> = {
      content: [
        { id: 1, name: 'test', description: 'test' },
        { id: 2, name: 'test_2', description: 'test' }
      ],
      totalElements: 1,
      totalPages: 1,
      pageNumber: 0,
      pageSize: 5,
      last: true
    }

    const mockBrandResponse: Pagination<BrandResponse> = {
      content: [
        { id: 1, name: 'test_brand', description: 'test' }
      ],
      totalElements: 1,
      totalPages: 1,
      pageNumber: 0,
      pageSize: 5,
      last: true
    }

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

    jest.spyOn(categoryService, 'getCategories').mockReturnValue(of(mockCategoryResponse));
    jest.spyOn(brandService, 'getBrands').mockReturnValue(of(mockBrandResponse));
    jest.spyOn(itemService, 'getItems').mockReturnValue(of(mockItemResponse));

    component.ngOnInit();

    expect(itemService.getItems).toHaveBeenCalled();
    expect(categoryService.getCategories).toHaveBeenCalled();
    expect(brandService.getBrands).toHaveBeenCalled();
    expect(component.items).toEqual(mockItemResponse);
    expect(component.categories).toEqual(mockCategoryResponse.content.map(category => ({ selected: false, data: category })));
    expect(component.brands).toEqual(mockBrandResponse.content);


  });

  it('should show error message when get items error', () => {
    const errorResponse = new HttpResponse({ status: HttpStatusCode.NotFound });
    jest.spyOn(itemService, 'getItems').mockReturnValue(throwError(() => errorResponse));

    component.ngOnInit();

    expect(itemService.getItems).toHaveBeenCalled();
    expect(notificationService.show).toHaveBeenCalledWith({
      message: ERROR_MESSAGES_BY_CODE[HttpStatusCode.NotFound] || GENERIC_ERROR_MESSAGE,
      type: NotificationType.ERROR
    });
  });

  it('should show error message when get categories error', () => {
    const errorResponse = new HttpResponse({ status: HttpStatusCode.NotFound });
    jest.spyOn(categoryService, 'getCategories').mockReturnValue(throwError(() => errorResponse));

    component.ngOnInit();

    expect(categoryService.getCategories).toHaveBeenCalled();
    expect(notificationService.show).toHaveBeenCalledWith({
      message: CATEGORY_ERROR_MESSAGES_BY_CODE[HttpStatusCode.NotFound] || GENERIC_ERROR_MESSAGE,
      type: NotificationType.ERROR
    });
  });

  it('should show error message when server error', () => {
    const errorResponse = new HttpResponse({ status: HttpStatusCode.NotImplemented });
    jest.spyOn(categoryService, 'getCategories').mockReturnValue(throwError(() => errorResponse));

    component.ngOnInit();

    expect(categoryService.getCategories).toHaveBeenCalled();
    expect(notificationService.show).toHaveBeenCalledWith({
      message: GENERIC_ERROR_MESSAGE,
      type: NotificationType.ERROR
    });
  });

  it('should show error message when get brands error', () => {
    const errorResponse = new HttpResponse({ status: HttpStatusCode.NotFound });
    jest.spyOn(brandService, 'getBrands').mockReturnValue(throwError(() => errorResponse));

    component.ngOnInit();

    expect(brandService.getBrands).toHaveBeenCalled();
    expect(notificationService.show).toHaveBeenCalledWith({
      message: BRAND_ERROR_MESSAGES_BY_CODE[HttpStatusCode.NotFound] || GENERIC_ERROR_MESSAGE,
      type: NotificationType.ERROR
    });
  });

  it('should show error message when server error', () => {
    const errorResponse = new HttpResponse({ status: HttpStatusCode.NotImplemented });
    jest.spyOn(brandService, 'getBrands').mockReturnValue(throwError(() => errorResponse));

    component.ngOnInit();

    expect(brandService.getBrands).toHaveBeenCalled();
    expect(notificationService.show).toHaveBeenCalledWith({
      message: GENERIC_ERROR_MESSAGE,
      type: NotificationType.ERROR
    });
  });

  it('should not create item if form is invalid', () => {
    component.itemForm.setErrors({ invalid: true });
    component.createItem();

    expect(component.itemForm.touched).toBe(true);
    expect(itemService.createItem).not.toHaveBeenCalled();
    expect(notificationService.show).not.toHaveBeenCalled();
  });

  it('should create item successfully', () => {
    const item: Item = {
      name: 'test',
      description: 'test',
      price: 100,
      stock: 10,
      categories: [1,2],
      brandId: 1
    }
    const mockResponse = new HttpResponse<Item>({ status: 201, body: item });

    jest.spyOn(itemService, 'createItem').mockReturnValue(of(mockResponse));

    component.itemForm.setValue(item);

    component.createItem();

    expect(itemService.createItem).toHaveBeenCalledWith(item);
    expect(notificationService.show).toHaveBeenCalledWith({
      message: RESPONSE_MESSAGE.ITEM_CREATED,
      type: NotificationType.SUCCESS
    })
  });

  it('should show error message when create item unexpected response', () => {
    const item: Item = {
      name: 'test',
      description: 'test',
      price: 100,
      stock: 10,
      categories: [1,2],
      brandId: 1
    }
    const mockResponse = new HttpResponse<Item>({ status: 200, body: item });

    jest.spyOn(itemService, 'createItem').mockReturnValue(of(mockResponse));

    component.itemForm.setValue(item);

    component.createItem();

    expect(itemService.createItem).toHaveBeenCalledWith(item);
    expect(notificationService.show).toHaveBeenCalledWith({
      message: RESPONSE_MESSAGE.UNEXPECTED_RESPONSE,
      type: NotificationType.ERROR
    });
  });

  it('should show error message when create category error', () => {
    const item: Item = {
      name: 'test',
      description: 'test',
      price: 100,
      stock: 10,
      categories: [1,2],
      brandId: 1
    }
    const errorResponse = new HttpResponse({ status: HttpStatusCode.Conflict });

    jest.spyOn(itemService, 'createItem').mockReturnValue(throwError(() => errorResponse));

    component.itemForm.setValue(item);

    component.createItem();

    expect(itemService.createItem).toHaveBeenCalledWith(item);
    expect(notificationService.show).toHaveBeenCalledWith({
      message: ERROR_MESSAGES_BY_CODE[HttpStatusCode.Conflict] || GENERIC_ERROR_MESSAGE,
      type: NotificationType.ERROR
    });
  });

  it('should show error message when server error', () => {
    const item: Item = {
      name: 'test',
      description: 'test',
      price: 100,
      stock: 10,
      categories: [1,2],
      brandId: 1
    }
    const errorResponse = new HttpResponse({ status: HttpStatusCode.NotImplemented });

    jest.spyOn(itemService, 'createItem').mockReturnValue(throwError(() => errorResponse));

    component.itemForm.setValue(item);

    component.createItem();

    expect(itemService.createItem).toHaveBeenCalledWith(item);
    expect(notificationService.show).toHaveBeenCalledWith({
      message: GENERIC_ERROR_MESSAGE,
      type: NotificationType.ERROR
    });
  });

  it('should return empty string if no error', () => {
    const error = component.getErrorMessage(null, 'test');
    expect(error).toEqual('');
  });

  it('should return empty string if control is valid', () => {
    const control = component.itemName;

    control?.markAsTouched();
    control?.setErrors(null);

    const errorMessage = component.getErrorMessage(control, FIELD_NAMES.ITEM_NAME[0]);
    expect(errorMessage).toBe('');
  });

  it('should return error message if invalid item name', () => {
    const control = component.itemName;
    control?.markAsTouched();
    control?.setErrors({ required: true });

    const errorMessage = component.itemNameErrorMessage;
    expect(errorMessage).toBe(ERROR_MESSAGES.required(FIELD_NAMES.ITEM_NAME[1]));
  });

  it('should open modal', () => {
    expect(component.isModalOpen).toBe(false);
    component.openModal();
    expect(component.isModalOpen).toBe(true);
  })

  it('should close modal', () => {
    component.isModalOpen = true;
    component.closeModal();
    expect(component.isModalOpen).toBe(false);
    expect(component.itemForm.value).toEqual({
      name: '',
      description: '',
      price: '',
      stock: '',
      brandId: null,
      categories: []
    });
    expect(component.itemForm.pristine).toBe(true);
    expect(component.itemForm.untouched).toBe(true);
  })

  it('should parse price and return a string', () => {
    const price = 100;
    const priceString = component.parsePrice(price);
    expect(priceString).toBe('$100,00');
  });

  it('should get categories names and return a string array', () => {
    const categories: CategoryResponse[] = [
      { id: 1, name: 'test', description: 'test' },
      { id: 2, name: 'test_2', description: 'test' }
    ];
    const categoriesString = component.getCategoriesNames(categories);
    expect(categoriesString).toEqual(['test', 'test_2']);
  });

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

});
