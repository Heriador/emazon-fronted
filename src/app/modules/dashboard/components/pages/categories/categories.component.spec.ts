import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesComponent } from './categories.component';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../../../services/categories/category.service';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Category } from 'src/app/interfaces/category.interface';
import { of } from 'rxjs';

class MockCategoryService {
  createCategory = jest.fn();
}

class MockNotificationService {
  show = jest.fn();
}

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let categoryService: MockCategoryService;
  let notificationService: MockNotificationService;

  beforeEach(async () => {

    categoryService = new MockCategoryService();
    notificationService = new MockNotificationService();

    await TestBed.configureTestingModule({
      declarations: [ CategoriesComponent ],
      imports: [ReactiveFormsModule],
      providers: [
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

  it('should create category successfully', () => {
    const mockResponse = new HttpResponse<Category>({status:  201,body: { name: 'test', description: 'test' } as Category });
    categoryService.createCategory.mockReturnValue(of(mockResponse));

    component.categoryForm.setValue({ name: 'test', description: 'test' });

    component.createCategory();

    expect(categoryService.createCategory).toHaveBeenCalledWith({ 
      name: 'test',
      description: 'test' 
    });
    expect(notificationService.show).toHaveBeenCalledWith({
      message: 'Categoria creada con éxito',
      type: 'success'
    });
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

  it('should show error message when category already exists', () => {
    const mockResponse = new HttpErrorResponse({ status: HttpStatusCode.Conflict, error: { 'message': 'Category already exists' }});
    categoryService.createCategory.mockReturnValue(of(mockResponse));

    component.categoryForm.setValue({ name: 'test', description: 'test' });

    component.createCategory();

    expect(categoryService.createCategory).toHaveBeenCalledWith({ 
      name: 'test',
      description: 'test' 
    });
    expect(notificationService.show).toHaveBeenCalledWith({
      message: 'Respuesta inesperada del servidor',
      type: 'error'
    })

  })

});
