import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user-register/user-register.component';
import { WizardModule } from '../wizard/wizard.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from './user-edit/user-edit.component';



@NgModule({
  declarations: [
    UserRegisterComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    WizardModule,
    ReactiveFormsModule
  ],
  exports: [
    UserRegisterComponent,
    UserEditComponent
  ]
})
export class UserModule { }
