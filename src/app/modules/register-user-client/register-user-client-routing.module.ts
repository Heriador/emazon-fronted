import { RouterModule, Routes } from "@angular/router";
import { RegisterUserClientComponent } from "./register-user-client.component";
import { NgModule } from "@angular/core";


const routes: Routes = [
    {path: '', component: RegisterUserClientComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResgistUserClientRoutingModule { }