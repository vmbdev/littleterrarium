import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { SigninComponent } from './signin/signin.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth/auth.service';



@NgModule({
  declarations: [
    LogoutComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
