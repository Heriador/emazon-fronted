import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsComponent } from './brands.component';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { BrandService } from '../../../../../services/brand/brand.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Brand } from 'src/app/interfaces/brand.interface';
import { of, throwError } from 'rxjs';
import { ERROR_CODES, ERROR_MESSAGES, ERROR_MESSAGES_BY_CODE, FIELD_NAMES, GENERIC_ERROR_MESSAGE, RESPONSE_MESSAGE } from '../../../../../shared/constants/brand-constant';
import { NotificationType } from '../../../../../shared/constants/enums';

describe('BrandsComponent', () => {
  let component: BrandsComponent;
  let fixture: ComponentFixture<BrandsComponent>;
  let brandService: jest.Mocked<BrandService>;
  let notificationService: jest.Mocked<NotificationService>

  beforeEach(async () => {

    brandService = {
      createBrand: jest.fn(),
    } as unknown as jest.Mocked<BrandService>;

    notificationService = {
      show: jest.fn()
    } as unknown as jest.Mocked<NotificationService>;

    await TestBed.configureTestingModule({
      declarations: [ BrandsComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: BrandService, useValue: brandService },
        { provide: NotificationService, useValue: notificationService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return empty string if control is null', () => {
    const errorMessage = component.getErrorMessage(null, '');
    expect(errorMessage).toBe('');
  })

  it('should return empty string if control is valid', () => {
    const control = component.brandForm.get(FIELD_NAMES.BRAND_NAME);

    control?.markAsTouched();
    control?.setErrors(null);

    const errorMessage = component.getErrorMessage(control, '');
    expect(errorMessage).toBe('');
  });

  it('should return error message if invalid category name', () => {
    const control = component.brandForm.get(FIELD_NAMES.BRAND_NAME);
    control?.markAsTouched();
    control?.setErrors({required: true});

    const errorMessage = component.brandNameErrorMessage;
    expect(errorMessage).toBe(ERROR_MESSAGES.required(FIELD_NAMES.BRAND_NAME));
  })

  it('should return error message if invalid category description', () => {
    const control = component.brandForm.get(FIELD_NAMES.BRAND_DESCRIPTION);
    control?.markAsTouched();
    control?.setErrors({required: true});

    const errorMessage = component.brandDescriptionErrorMessage;
    expect(errorMessage).toBe(ERROR_MESSAGES.required(FIELD_NAMES.BRAND_DESCRIPTION));
  })

  it('should not create brand if form is invalid', () => {
    component.brandForm.setValue({name: '', description: ''});
    component.createBrand();

    expect(brandService.createBrand).not.toHaveBeenCalled();
    expect(notificationService.show).not.toHaveBeenCalled();  
  });

  it('should show error message if create category unexpected error', () => {
    const mockResponse = new HttpResponse<Brand>({status: HttpStatusCode.Ok})
    const formValue = {name: 'Test Brand', description: 'Test Description'};
    jest.spyOn(brandService, 'createBrand').mockReturnValueOnce(of(mockResponse));

    component.brandForm.setValue(formValue);

    component.createBrand();

    expect(brandService.createBrand).toHaveBeenCalledWith(formValue);
    expect(notificationService.show).toHaveBeenCalledWith({
      message: RESPONSE_MESSAGE.UNEXPECTED_RESPONSE,
      type: NotificationType.ERROR
    })


  });


  it('should create a brand successfully', () => {
    const brand: Brand = {
      name: 'Test Brand',
      description: 'Test Description'
    }
    const mockResponse = new HttpResponse<Brand>({
      status: HttpStatusCode.Created,
      body: brand
    })

    jest.spyOn(brandService, 'createBrand').mockReturnValueOnce(of(mockResponse));

    component.brandForm.setValue(brand);

    component.createBrand();

    expect(brandService.createBrand).toHaveBeenCalledWith(brand);
    expect(notificationService.show).toHaveBeenCalledWith({
      message: RESPONSE_MESSAGE.BRAND_CREATED,
      type: NotificationType.SUCCESS
    })
    expect(component.brandForm.value).toEqual({
      name: '',
      description: ''
    });
    expect(component.brandForm.pristine).toBe(true);
    expect(component.brandForm.untouched).toBe(true);
  });

  it('should show error message when creating brand error', () => {
    const errorResponse = new HttpErrorResponse({ status: HttpStatusCode.Conflict });
    jest.spyOn(brandService, 'createBrand').mockReturnValueOnce(throwError(() => errorResponse));

    component.brandForm.setValue({ name: 'test', description: 'test' });

    component.createBrand();

    expect(brandService.createBrand).toHaveBeenCalledWith({ 
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
    jest.spyOn(brandService, 'createBrand').mockReturnValueOnce(throwError(() => errorResponse));

    component.brandForm.setValue({ name: 'test', description: 'test' });

    component.createBrand();

    expect(brandService.createBrand).toHaveBeenCalledWith({ 
      name: 'test',
      description: 'test' 
    });
    expect(notificationService.show).toHaveBeenCalledWith({
      message: GENERIC_ERROR_MESSAGE,
      type:NotificationType.ERROR
    });
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
    expect(component.brandForm.value).toEqual({ name: '', description: '' });
    expect(component.brandForm.pristine).toBe(true);
    expect(component.brandForm.untouched).toBe(true);
  })


});
