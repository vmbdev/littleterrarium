import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user-register/user-register.component';
import { WizardModule } from '../wizard/wizard.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    WizardModule,
    ReactiveFormsModule
  ],
  exports: [
    UserRegisterComponent
  ]
})
export class UserModule { }
