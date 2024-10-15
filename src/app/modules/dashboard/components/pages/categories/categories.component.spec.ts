import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesComponent } from './categories.component';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../../../services/categories/category.service';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Category, CategoryResponse } from 'src/app/interfaces/category.interface';
import { of, throwError } from 'rxjs';
import { Pagination } from 'src/app/interfaces/paginated.interface';
import { ERROR_MESSAGES_BY_CODE, GENERIC_ERROR_MESSAGE, RESPONSE_MESSAGE } from '../../../../../shared/constants/category-constant';
import { NotificationType } from '../../../../../shared/constants/enums';



describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let categoryService: jest.Mocked<CategoryService>;
  let notificationService: jest.Mocked<NotificationService>;

  beforeEach(async () => {

    categoryService = {
      createCategory: jest.fn(),
      getCategories: jest.fn()
    } as unknown as jest.Mocked<CategoryService>;

    notificationService = {
      show: jest.fn()
    } as unknown as jest.Mocked<NotificationService>;

    await TestBed.configureTestingModule({
      declarations: [ CategoriesComponent ],
      imports: [ReactiveFormsModule],
      providers: [ FormBuilder, 
        { provide: CategoryService, useValue: categoryService },
        { provide: NotificationService, useValue: notificationService }
       ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get categories on init', () => {
    const mockResponse: Pagination<CategoryResponse> = {
      content: [
        { id: 1, name: 'test', description: 'test' }
      ],
      totalElements: 1,
      totalPages: 1,
      pageNumber: 0,
      pageSize: 5,
      last: true
    }

    jest.spyOn(categoryService, 'getCategories').mockReturnValue(of(mockResponse));

    component.ngOnInit();

    // expect(component.getCategories).toHaveBeenCalledWith(0, 5, true);
    expect(categoryService.getCategories).toHaveBeenCalledWith(0, 5, true);
    expect(component.categories).toEqual(mockResponse.content);
    expect(component.totalElements).toEqual(mockResponse.totalElements);
    expect(component.totalPages).toEqual(mockResponse.totalPages);
  })

  it('should show error message when get categories error', () => {
    const errorResponse = new HttpErrorResponse({ status: HttpStatusCode.NotFound });
    jest.spyOn(categoryService, 'getCategories').mockReturnValue(throwError(() => errorResponse));

    component.ngOnInit();

    expect(categoryService.getCategories).toHaveBeenCalledWith(0, 5, true);
    expect(notificationService.show).toHaveBeenCalledWith({
      message: ERROR_MESSAGES_BY_CODE[HttpStatusCode.NotFound],
      type: NotificationType.ERROR
    });
  });

  it('should create category successfully', () => {
    const mockResponse = new HttpResponse<Category>({status:  201,body: { name: 'test', description: 'test' } as Category });
    jest.spyOn(categoryService, 'createCategory').mockReturnValue(of(mockResponse));

    component.categoryForm.setValue({ name: 'test', description: 'test' });

    component.createCategory();

    expect(categoryService.createCategory).toHaveBeenCalledWith({ 
      name: 'test',
      description: 'test' 
    });
    expect(notificationService.show).toHaveBeenCalledWith({
      message: RESPONSE_MESSAGE.CATEGORY_CREATED,
      type: NotificationType.SUCCESS
    });
    expect(component.categoryForm.value).toEqual({ name: '', description: '' });
    expect(component.categoryForm.pristine).toBe(true);
    expect(component.categoryForm.untouched).toBe(true);

  });

  it('should return error message for create category unexpected response', () => {
    const mockResponse = new HttpResponse<Category>({status: HttpStatusCode.Ok,body: { name: 'test', description: 'test' } as Category });
    const formValue = { name: 'test', description: 'test' };
    jest.spyOn(categoryService, 'createCategory').mockReturnValue(of(mockResponse));

    component.categoryForm.setValue(formValue);

    component.createCategory();

    expect(categoryService.createCategory).toHaveBeenCalledWith(formValue);
    expect(notificationService.show).toHaveBeenCalledWith({
      message: RESPONSE_MESSAGE.UNEXPECTED_RESPONSE,
      type: NotificationType.ERROR
    });
  });

  it('should show error message when creating category error', () => {
    const errorResponse = new HttpErrorResponse({ status: HttpStatusCode.Conflict });
    jest.spyOn(categoryService, 'createCategory').mockReturnValue(throwError(() => errorResponse));

    component.categoryForm.setValue({ name: 'test', description: 'test' });

    component.createCategory();

    expect(categoryService.createCategory).toHaveBeenCalledWith({ 
      name: 'test',
      description: 'test' 
    });
    expect(notificationService.show).toHaveBeenCalledWith({
      message: ERROR_MESSAGES_BY_CODE[HttpStatusCode.Conflict] || GENERIC_ERROR_MESSAGE,
      type:NotificationType.ERROR
    });

  })

  it('should show error message when server error', () => {
    const errorResponse = new HttpErrorResponse({ status: HttpStatusCode.NotImplemented });
    categoryService.createCategory.mockReturnValue(throwError(() => errorResponse));

    component.categoryForm.setValue({ name: 'test', description: 'test' });

    component.createCategory();

    expect(categoryService.createCategory).toHaveBeenCalledWith({ 
      name: 'test',
      description: 'test' 
    });
    expect(notificationService.show).toHaveBeenCalledWith({
      message: GENERIC_ERROR_MESSAGE,
      type: NotificationType.ERROR
    })
  });

  it('should create category form', () => {
    expect(component.categoryForm).toBeTruthy();
    expect(component.categoryForm.get('name')).toBeTruthy();
    expect(component.categoryForm.get('description')).toBeTruthy();
  });

  it('should return empty string if no error', () => {
    const errorMessage = component.getErrorMessage(null, '');
    expect(errorMessage).toBe('');
  })

  it('should return error message for invalid category name', () => {
    const control = component.categoryForm.get('name');
    control?.markAsTouched();
    control?.setErrors({ required: true });
    const errorMessage = component.categoryNameError;
    expect(errorMessage).toBe('name requerido.');
  })

  it('should return error message for invalid category description', () => {
    const control: AbstractControl | null = component.categoryForm.get('description');
    control?.markAsTouched();
    control?.setErrors({ required: true });
    const errorMessage = component.categoryDescriptionError;
    expect(errorMessage).toBe('description requerido.');
  })

  it('should open modal', () => {
    expect(component.isModalOpen).toBe(false);
    component.openModal();
    expect(component.isModalOpen).toBe(true);
  })

  it('should close modal', () => {
    component.isModalOpen = true;
    component.closeModal();
    expect(component.isModalOpen).toBe(false);
    expect(component.categoryForm.value).toEqual({ name: '', description: '' });
    expect(component.categoryForm.pristine).toBe(true);
    expect(component.categoryForm.untouched).toBe(true);
  })

  it('should not create category when form is invalid', () => {
    component.categoryForm.setValue({ name: '', description: '' });
    component.createCategory();
    // expect(component.createCategory).toHaveReturned();
    expect(categoryService.createCategory).not.toHaveBeenCalled();
    expect(notificationService.show).not.toHaveBeenCalled();
  })

  it('should change page successfully', () => {

    const mockResponse: Pagination<CategoryResponse> = {
      content: [
        { id: 1, name: 'test', description: 'test' }
      ],
      totalElements: 1,
      totalPages: 1,
      pageNumber: 0,
      pageSize: 5,
      last: true
    }

    jest.spyOn(categoryService, 'getCategories').mockReturnValue(of(mockResponse));

    component.page = 0;
    component.changePage(1);
    expect(component.page).toBe(1);
  });

  it('should change size successfully', () => {

    const mockResponse: Pagination<CategoryResponse> = {
      content: [
        { id: 1, name: 'test', description: 'test' }
      ],
      totalElements: 1,
      totalPages: 1,
      pageNumber: 0,
      pageSize: 5,
      last: true
    }

    jest.spyOn(categoryService, 'getCategories').mockReturnValue(of(mockResponse));

    component.size = 5;
    component.changeSize(10);
    expect(component.size).toBe(10);
  });

  it('should change asc successfully', () => {

    const mockResponse: Pagination<CategoryResponse> = {
      content: [
        { id: 1, name: 'test', description: 'test' }
      ],
      totalElements: 1,
      totalPages: 1,
      pageNumber: 0,
      pageSize: 5,
      last: true
    }

    jest.spyOn(categoryService, 'getCategories').mockReturnValue(of(mockResponse));

    component.isAsc = true;
    component.changeAsc(false);
    expect(component.isAsc).toBe(false);
  });
 

});
