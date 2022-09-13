import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiFormComponent } from './multiform/multiform.component';
import { PageComponent } from './page/page.component';



@NgModule({
  declarations: [
    MultiFormComponent,
    PageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MultiFormComponent,
    PageComponent
  ]
})
export class MultiFormModule { }
