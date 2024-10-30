import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpFormComponent } from './components/pages/sign-up-form/sign-up-form.component';
import { SharedModule } from "../../shared/shared.module";



@NgModule({
  declarations: [
    // SignUpFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
]
})
export class WareHouseAssisSignUpModule { }
