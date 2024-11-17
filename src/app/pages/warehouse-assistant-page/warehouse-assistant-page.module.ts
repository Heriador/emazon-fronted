import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WareHouseAssisSignUpModule } from 'src/app/modules/ware-house-assis-sign-up/ware-house-assis-sign-up.module';
import { WarehouseAssistantPageRoutingModule } from './warehouse-assistant-page-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WarehouseAssistantPageRoutingModule,
    WareHouseAssisSignUpModule
  ]
})
export class WarehouseAssistantPageModule { }
