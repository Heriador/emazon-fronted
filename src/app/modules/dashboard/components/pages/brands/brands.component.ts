import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { BrandService } from 'src/app/services/brand/brand.service';
import { ERROR_MESSAGES, ERROR_MESSAGES_BY_CODE, FIELD_NAMES, GENERIC_ERROR_MESSAGE, RESPONSE_MESSAGE } from 'src/app/shared/constants/brand-constant';
import { NotificationType, TextType } from 'src/app/shared/constants/enums';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  TextType = TextType;
  isModalOpen: boolean = false;
  public brandForm: FormGroup;

  constructor(
    private readonly brandServivce: BrandService,
    private readonly notificationService: NotificationService,
    private readonly formBuilder: FormBuilder
  ) { 
    this.brandForm = this.formBuilder.group({
      name:[
        '',[
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      description: [
        '',[
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ]
    })
  }

  ngOnInit(): void {
  }

  getErrorMessage(control: AbstractControl | null, fieldName: string): string {

    if(control?.touched && control?.errors){
      const firstError = Object.keys(control.errors)[0] as keyof typeof ERROR_MESSAGES;
      const errorMessage = control.errors[firstError] as string;
      return ERROR_MESSAGES[firstError](fieldName, errorMessage);
    }

    return '';
  }

  get brandName(){
    return this.brandForm.get(FIELD_NAMES.BRAND_NAME);
  }

  get brandDescription(){
    return this.brandForm.get(FIELD_NAMES.BRAND_DESCRIPTION);
  }

  get brandNameErrorMessage(){
    return this.getErrorMessage(this.brandName, FIELD_NAMES.BRAND_NAME)
  }

  get brandDescriptionErrorMessage(){
    return this.getErrorMessage(this.brandDescription, FIELD_NAMES.BRAND_DESCRIPTION)
  }

  createBrand(){

    if(this.brandForm.invalid){
      this.brandForm.markAllAsTouched();
      return;
    }

    this.brandServivce
      .createBrand(this.brandForm.value)
      .subscribe({
        next: (response) => {

          if(response.status !== HttpStatusCode.Created){
            return this.notificationService.show({
              message: RESPONSE_MESSAGE.UNEXPECTED_RESPONSE,
              type: NotificationType.ERROR
            })
          }
          
          this.notificationService.show({
            message: RESPONSE_MESSAGE.BRAND_CREATED, 
            type: NotificationType.SUCCESS
          });

          this.brandForm.reset({
            name: '',
            description: ''
          })

          this.brandForm.markAsPristine();
          this.brandForm.markAsUntouched();

        } ,
        error: (error) => {
          this.notificationService.show({
            message: ERROR_MESSAGES_BY_CODE[error.status] || GENERIC_ERROR_MESSAGE,
            type: NotificationType.ERROR
          })
        }
      })

  }

  openModal(){
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
    this.brandForm.reset({
      name: '',
      description: ''
    })
    this.brandForm.markAsPristine();
    this.brandForm.markAsUntouched();
  }

}
