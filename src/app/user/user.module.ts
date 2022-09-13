import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user-register/user-register.component';
import { MultiFormModule } from '../multiform/multiform.module';



@NgModule({
  declarations: [
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    MultiFormModule
  ],
  exports: [
    UserRegisterComponent
  ]
})
export class UserModule { }
