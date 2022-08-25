import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { LocationModule } from '../location/location.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    BrowserModule,
    LocationModule
  ]
})
export class HomeModule { }
