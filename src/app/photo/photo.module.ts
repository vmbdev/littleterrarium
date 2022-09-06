import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from './photo/photo.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PhotoAddEditComponent } from './photo-add-edit/photo-add-edit.component';
import { PhotoListComponent } from './photo-list/photo-list.component';



@NgModule({
  declarations: [
    PhotoComponent,
    PhotoAddEditComponent,
    PhotoListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    PhotoComponent,
    PhotoAddEditComponent,
    PhotoListComponent
  ]
})
export class PhotoModule { }
