import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseAssistantSignUpComponent } from './sign-up-form.component';
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WarehouseAssistantSignUpComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
]
})
export class WareHouseAssisSignUpModule { }
