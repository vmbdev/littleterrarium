import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationListComponent } from './location-list/location-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LocationListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    LocationListComponent,
  ]
})
export class LocationModule { }
