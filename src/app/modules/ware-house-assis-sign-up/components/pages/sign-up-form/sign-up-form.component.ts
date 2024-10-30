import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { User } from '../../../../../interfaces/user.interface';
import { UsersService } from '../../../../../services/users.service';
import { NotificationType, TextType } from '../../../../../shared/constants/enums';
import { 
  GENERIC_ERROR_MESSAGE, 
  USER_ERROR_MESSAGES, 
  USER_ERROR_MESSAGES_BY_CODE, 
  USER_FIELD_NAMES, 
  USER_RESPONSE_MESSAGE 
} from '../../../../../shared/constants/user-constant';
import { adultValidator } from '../../../../../shared/utils/adult-validator';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent {

  TextType = TextType;

  public signUpForm: FormGroup;

  constructor(
    private readonly userService: UsersService,
    private readonly notificationService: NotificationService,
    private readonly formBuilder: FormBuilder,
  ) { 
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['',[Validators.required, Validators.minLength(3)]],
      identityDocument: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['',[Validators.required, Validators.pattern(/^(\+?\d{1,3})?\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      birthDate: ['', [Validators.required, adultValidator()]],
    });
  }

  getErrorMessage(control: AbstractControl | null, fieldName: string): string {
    if(control?.touched && control?.errors){
      const firstError = Object.keys(control.errors)[0] as keyof typeof USER_ERROR_MESSAGES;
      const error = control.errors[firstError];
      return USER_ERROR_MESSAGES[firstError](fieldName, error);
    }

    return '';
  }

  
  get name(): AbstractControl | null {
     return this.signUpForm.get(USER_FIELD_NAMES.USER_NAME[0]); 
  }

  get lastName(): AbstractControl | null {
    return this.signUpForm.get(USER_FIELD_NAMES.USER_LAST_NAME[0]);
  }

  get identityDocument(): AbstractControl | null {
    return this.signUpForm.get(USER_FIELD_NAMES.USER_IDENTITY_DOCUMENT[0]);
  }

  get phone(): AbstractControl | null {
    return this.signUpForm.get(USER_FIELD_NAMES.USER_PHONE[0]);
  }

  get email(): AbstractControl | null {
    return this.signUpForm.get(USER_FIELD_NAMES.USER_EMAIL[0]);
  }

  get password(): AbstractControl | null {
    return this.signUpForm.get(USER_FIELD_NAMES.USER_PASSWORD[0]);
  }

  get birthDate(): AbstractControl | null {
    return this.signUpForm.get(USER_FIELD_NAMES.USER_BIRTH_DATE[0]);
  }

  get nameErrorMessage(): string {
    return this.getErrorMessage(this.name, USER_FIELD_NAMES.USER_NAME[1]);
  }

  get lastNameErrorMessage(): string {
    return this.getErrorMessage(this.lastName, USER_FIELD_NAMES.USER_LAST_NAME[1]);
  }

  get identityDocumentErrorMessage(): string {
    return this.getErrorMessage(this.identityDocument, USER_FIELD_NAMES.USER_IDENTITY_DOCUMENT[1]);
  }

  get phoneErrorMessage(): string {
    return this.getErrorMessage(this.phone, USER_FIELD_NAMES.USER_PHONE[1]);
  }

  get emailErrorMessage(): string {
    return this.getErrorMessage(this.email, USER_FIELD_NAMES.USER_EMAIL[1]);
  }

  get passwordErrorMessage(): string {
    return this.getErrorMessage(this.password, USER_FIELD_NAMES.USER_PASSWORD[1]);
  }

  get birthDateErrorMessage(): string {
    return this.getErrorMessage(this.birthDate, USER_FIELD_NAMES.USER_BIRTH_DATE[1]);
  }


  onSubmit(): void {
    if(this.signUpForm.invalid){
      this.signUpForm.markAllAsTouched();
      return;
    }

    const assistant: User = this.signUpForm.value;
    assistant.birthDate = formatDate(assistant.birthDate);

    this.userService
      .createWarehouseAssis(assistant)
      .subscribe({
        next: (response) => {
          if(response.status !== HttpStatusCode.Created){
            return this.notificationService.show({
              message: USER_RESPONSE_MESSAGE.UNEXPECTED_RESPONSE,
              type: NotificationType.ERROR
            })
          }

          this.notificationService.show({
            message: USER_RESPONSE_MESSAGE.WAREHOUSE_ASSIS_USER_CREATED,
            type: NotificationType.SUCCESS
          })
        },
        error: (error) => {
          this.notificationService.show({
            message: USER_ERROR_MESSAGES_BY_CODE[error.status] || GENERIC_ERROR_MESSAGE,
            type: NotificationType.ERROR
          })
        }
      });
  }

}

function formatDate(date: string): string {

  const parseDate = Date.parse(date);

  const d = new Date(parseDate);
  const day = d.getUTCDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}
