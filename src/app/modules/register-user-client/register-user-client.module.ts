import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserClientComponent } from './register-user-client.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResgistUserClientRoutingModule } from './register-user-client-routing.module';



@NgModule({
  declarations: [
    RegisterUserClientComponent
  ],
  imports: [
    CommonModule,
    ResgistUserClientRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RegisterUserClientModule { }
