import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardTemplateComponent } from 'src/app/components/templates/dashboard-template/dashboard-template.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterComponent } from 'src/app/components/organisms/footer/footer.component';
import { CreateCategoryComponent } from 'src/app/components/organisms/create-category/create-category.component';
import { CategoriesComponent } from 'src/app/components/pages/categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardTemplateComponent,
    FooterComponent,
    CreateCategoryComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
