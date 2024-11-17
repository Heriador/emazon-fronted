import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CategoryPageRoutingModule } from "./category-page-routing.module";
import { CategoriesModule } from "src/app/modules/categories/categories.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        CategoryPageRoutingModule,
        CategoriesModule
    ]
})
export class CategoryPageModule {}
