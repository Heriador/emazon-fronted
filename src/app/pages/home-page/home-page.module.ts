import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomeModule } from 'src/app/modules/home/home.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    HomeModule
  ]
})
export class HomePageModule { }
