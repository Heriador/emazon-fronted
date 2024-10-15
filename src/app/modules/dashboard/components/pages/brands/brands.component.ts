import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { ERROR_MESSAGES, FIELD_NAMES } from 'src/app/shared/constants/category-constant';
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

    this.notificationService.show({
      message: 'Marca creada con éxito',
      type: NotificationType.SUCCESS
    });

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
