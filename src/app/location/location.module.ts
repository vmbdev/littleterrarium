import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationListComponent } from './location-list/location-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LocationComponent } from './location/location.component';
import { PlantModule } from '../plant/plant.module';

@NgModule({
  declarations: [
    LocationListComponent,
    LocationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    PlantModule
  ],
  exports: [
    LocationListComponent,
  ]
})
export class LocationModule { }