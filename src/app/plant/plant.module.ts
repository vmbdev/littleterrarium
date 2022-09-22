import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { PlantListComponent } from './plant-list/plant-list.component';
import { PlantComponent } from './plant/plant.component';
import { PhotoModule } from '../photo/photo.module';
import { PictureBoxModule } from '../picture-box/picture-box.module';
import { PlantAddComponent } from './plant-add/plant-add.component';
import { WizardModule } from '../wizard/wizard.module';
import { FileUploaderModule } from '../file-uploader/file-uploader.module';
import { SpecieFinderModule } from '../specie-finder/specie-finder.module';

@NgModule({
  declarations: [
    PlantListComponent,
    PlantComponent,
    PlantAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    PhotoModule,
    PictureBoxModule,
    WizardModule,
    FileUploaderModule,
    SpecieFinderModule
  ],
  exports: [
    PlantListComponent,
    PlantAddComponent
  ]
})
export class PlantModule { }
