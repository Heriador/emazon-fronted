import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrandPageRoutingModule } from "./brand-page-routing.module";
import { BrandsModule } from "src/app/modules/brands/brands.module";

@NgModule({
    imports: [
        CommonModule,
        BrandPageRoutingModule,
        BrandsModule
    ]
})
export class BrandPageModule {}
