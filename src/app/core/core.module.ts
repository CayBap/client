import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatterialModule } from '../matterial/matterial.module';

@NgModule({
  imports: [
    MatterialModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    MatterialModule,
    FormsModule,
    CommonModule
  ],
  declarations: []
})
export class CoreModule { }