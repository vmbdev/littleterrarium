import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainnavComponent } from './mainnav/mainnav.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserboxComponent } from './userbox/userbox.component';
import { BreadcrumbNavigationComponent } from './breadcrumb-navigation/breadcrumb-navigation.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';

@NgModule({
  declarations: [
    MainnavComponent,
    UserboxComponent,
    BreadcrumbNavigationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    BreadcrumbModule
  ],
  exports: [
    MainnavComponent,
    UserboxComponent
  ]
})
export class CoreModule { }
