import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardTemplateComponent } from 'src/app/modules/dashboard/components/templates/dashboard-template/dashboard-template.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterComponent } from 'src/app/shared/components/organisims/footer/footer.component';
import { CategoriesComponent } from 'src/app/modules/dashboard/components/pages/categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandsComponent } from './components/pages/brands/brands.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ItemsComponent } from './components/pages/items/items.component';



@NgModule({
  declarations: [
    DashboardTemplateComponent,
    FooterComponent,
    CategoriesComponent,
    BrandsComponent,
    ItemsComponent
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
