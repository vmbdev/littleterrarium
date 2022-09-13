import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { PlantListComponent } from './plant-list/plant-list.component';
import { PlantComponent } from './plant/plant.component';
import { PhotoModule } from '../photo/photo.module';
import { PlantAddEditComponent } from './plant-add-edit/plant-add-edit.component';
import { PictureBoxModule } from '../picture-box/picture-box.module';

@NgModule({
  declarations: [
    PlantListComponent,
    PlantComponent,
    PlantAddEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    PhotoModule,
    PictureBoxModule
  ],
  exports: [
    PlantListComponent,
    PlantAddEditComponent
  ]
})
export class PlantModule { }
