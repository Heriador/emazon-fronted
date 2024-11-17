import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardTemplateComponent } from 'src/app/shared/components/templates/dashboard-template/dashboard-template.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    DashboardTemplateComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class DashboardModule { }
