import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WarehouseAssistantSignUpComponent } from "src/app/modules/ware-house-assis-sign-up/sign-up-form.component";

const routes: Routes = [
    {
        path: '',
        component: WarehouseAssistantSignUpComponent
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WarehouseAssistantPageRoutingModule {}