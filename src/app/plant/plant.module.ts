import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { PlantListComponent } from './plant-list/plant-list.component';
import { PlantComponent } from './plant/plant.component';

@NgModule({
  declarations: [
    PlantListComponent,
    PlantComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    PlantListComponent
  ]
})
export class PlantModule { }
