import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardTemplateComponent } from "src/app/shared/components/templates/dashboard-template/dashboard-template.component";

const routes: Routes = [
    {
      path: '', 
      component: DashboardTemplateComponent,
      children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {
          path: 'home',
          loadChildren: () => 
            import('src/app/pages/home-page/home-page.module')
            .then(
              (m) => m.HomePageModule
            )
        },
        {
          path: 'categories',
          loadChildren: () => 
            import('src/app/pages/category-page/category-page.module')
          .then(
            (m) => m.CategoryPageModule
          )
        },
        {
          path: 'brands',
          loadChildren: () => 
            import('src/app/pages/brand-page/brand-page.module')
            .then(
              (m) => m.BrandPageModule
            )
        },
        {
          path: 'items',
          loadChildren: () => 
            import('src/app/pages/item-page/item-page.module')
            .then(
              (m) => m.ItemPageModule
            )
        },
        {
          path: 'warehouse-assistant',
          loadChildren: () => 
            import('src/app/pages/warehouse-assistant-page/warehouse-assistant-page.module')
            .then(
              (m) => m.WarehouseAssistantPageModule
            )
        },
        {
          path: 'cart',
          loadChildren: () => 
            import('src/app/pages/cart-page/cart-page.module')
            .then(
              (m) => m.CartPageModule
            )
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }