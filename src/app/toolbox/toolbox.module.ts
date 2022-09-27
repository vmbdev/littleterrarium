import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { ButtonComponent } from './button/button.component';



@NgModule({
  declarations: [
    ToolboxComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToolboxComponent,
    ButtonComponent
  ]
})
export class ToolboxModule { }
