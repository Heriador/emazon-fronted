import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesComponent } from "src/app/modules/dashboard/components/pages/categories/categories.component";
import { DashboardTemplateComponent } from "src/app/modules/dashboard/components/templates/dashboard-template/dashboard-template.component";
import { BrandsComponent } from "./components/pages/brands/brands.component";
import { ItemsComponent } from "./components/pages/items/items.component";
import { SignUpFormComponent } from "../ware-house-assis-sign-up/components/pages/sign-up-form/sign-up-form.component";

const routes: Routes = [
    {
      path: '', 
      component: DashboardTemplateComponent,
      children: [
        {path: 'categories', component: CategoriesComponent},
        {path: 'brands', component: BrandsComponent},
        {path: 'home', component: ItemsComponent},
        {path: 'warehouseass', component: SignUpFormComponent }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }