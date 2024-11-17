import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ItemsModule } from "src/app/modules/items/items.module";
import { ItemPageRoutingModule } from "./item-page-routing.module";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ItemPageRoutingModule,
        ItemsModule
    ]
})
export class ItemPageModule {}
