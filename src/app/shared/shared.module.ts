import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api/api.service';
import { SafeUrlPipe } from './safeurl/safeurl.pipe';
import { PictureboxComponent } from './picturebox/picturebox.component';

@NgModule({
  declarations: [
    SafeUrlPipe,
    PictureboxComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ApiService
  ],
  exports: [
    SafeUrlPipe,
    PictureboxComponent
  ]
})
export class SharedModule { }
