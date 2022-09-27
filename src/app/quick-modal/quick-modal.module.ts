import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickModalComponent } from './quick-modal/quick-modal.component';
import { CloseButtonComponent } from './close-button/close-button.component';



@NgModule({
  declarations: [
    QuickModalComponent,
    CloseButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    QuickModalComponent
  ]
})
export class QuickModalModule { }
