import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesComponent } from "src/app/modules/categories/categories.component";

const routes: Routes = [
    {
        path: '',
        component: CategoriesComponent
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BrandPageRoutingModule {}