import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user-register/user-register.component';
import { WizardModule } from '../wizard/wizard.module';



@NgModule({
  declarations: [
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    WizardModule
  ],
  exports: [
    UserRegisterComponent
  ]
})
export class UserModule { }
