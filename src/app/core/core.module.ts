import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainnavComponent } from './mainnav/mainnav.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserboxComponent } from './userbox/userbox.component';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [
    MainnavComponent,
    UserboxComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    MainnavComponent,
    UserboxComponent
  ]
})
export class CoreModule { }
