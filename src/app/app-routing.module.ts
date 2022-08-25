import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { SigninComponent } from './auth/signin/signin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
