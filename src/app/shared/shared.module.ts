import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api/api.service';
import { UserboxComponent } from './userbox/userbox.component';
import { SafeUrlPipe } from './safeurl/safeurl.pipe';

@NgModule({
  declarations: [
    UserboxComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ApiService
  ],
  exports: [
    UserboxComponent,
    SafeUrlPipe
  ]
})
export class SharedModule { }
