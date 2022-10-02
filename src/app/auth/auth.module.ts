import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { SigninComponent } from './signin/signin.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth/auth.service';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LogoutComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
