import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesComponent } from "src/app/modules/dashboard/components/pages/categories/categories.component";
import { DashboardTemplateComponent } from "src/app/modules/dashboard/components/templates/dashboard-template/dashboard-template.component";
import { BrandsComponent } from "./components/pages/brands/brands.component";

const routes: Routes = [
    {
      path: '', 
      component: DashboardTemplateComponent,
      children: [
        {path: 'categories', component: CategoriesComponent},
        {path: 'brands', component: BrandsComponent}
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }