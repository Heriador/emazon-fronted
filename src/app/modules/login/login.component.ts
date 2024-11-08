import { Component, OnInit } from '@angular/core';
import { NotificationType, TextType } from '../../shared/constants/enums';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from '../../core/services/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  TextType = TextType;

  public loginForm: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly formBuilder: FormBuilder
  ) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]]
    })
  }

  get email():AbstractControl | null{
    return this.loginForm.get('email');
  }

  get password():AbstractControl | null{
    return this.loginForm.get('password');
  }

  get emailErrorMessage(): string{
    const control = this.email;
    if(control?.touched && control?.errors){
      if(control.errors['required']){
        return 'Email is required';
      }
      if(control.errors['email']){
        return 'Invalid email';
      }

    }

    return '';
  }

  get passwordErrorMessage(): string{
    const control = this.password;
    if(control?.touched && control?.errors){
      if(control.errors['required']){
        return 'Password is required';
      }
    }

    return '';
  }


  onSubmit(): void {
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next:(response) => {

        if(response.jwt){
          console.log('entro')
          this.router.navigate(['/dashboard']);
        }
        else{
          this.notificationService.show({
            message: 'Correo o contraseña incorrectos',
            type: NotificationType.ERROR
          })
        }

      },
      error: (error) => {
        this.notificationService.show({
          message: 'Correo o contraseña incorrectos',
          type: NotificationType.ERROR
        })
      }
    })
  }


  ngOnInit(): void {
  }

}
