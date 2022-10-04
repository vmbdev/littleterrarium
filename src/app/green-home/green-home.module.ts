import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GreenHomeComponent } from './green-home/green-home.component';



@NgModule({
  declarations: [
    GreenHomeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GreenHomeComponent
  ]
})
export class GreenHomeModule { }
