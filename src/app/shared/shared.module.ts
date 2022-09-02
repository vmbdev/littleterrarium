import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api/api.service';
import { SafeUrlPipe } from './safeurl/safeurl.pipe';
import { PictureboxComponent } from './picturebox/picturebox.component';
import { NavigateBackService } from './navigateback/navigateback.service';
import { UnitPipe } from './unit/unit.pipe';

@NgModule({
  declarations: [
    SafeUrlPipe,
    PictureboxComponent,
    UnitPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ApiService,
    NavigateBackService
  ],
  exports: [
    SafeUrlPipe,
    PictureboxComponent,
    UnitPipe
  ]
})
export class SharedModule { }
