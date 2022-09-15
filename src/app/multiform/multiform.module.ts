import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiFormComponent } from './multiform/multiform.component';
import { PageComponent } from './page/page.component';
import { PageDescriptionComponent } from './page-description/page-description.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MultiFormComponent,
    PageComponent,
    PageDescriptionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    MultiFormComponent,
    PageComponent,
    PageDescriptionComponent
  ]
})
export class MultiFormModule { }
