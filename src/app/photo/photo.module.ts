import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from './photo/photo.component';
import { GalleryComponent } from './gallery/gallery.component';



@NgModule({
  declarations: [
    PhotoComponent,
    GalleryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PhotoModule { }
