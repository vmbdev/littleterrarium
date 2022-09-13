import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ApiService } from './api/api.service';
import { SafeUrlPipe } from './safeurl/safeurl.pipe';
import { NavigateBackService } from './navigateback/navigateback.service';
import { UnitPipe } from './unit/unit.pipe';
import { FloatingButtonComponent } from './floating-button/floating-button.component';

@NgModule({
  declarations: [
    FloatingButtonComponent,
    SafeUrlPipe,
    UnitPipe,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    ApiService,
    NavigateBackService
  ],
  exports: [
    FloatingButtonComponent,
    SafeUrlPipe,
    UnitPipe,
  ]
})
export class SharedModule { }
