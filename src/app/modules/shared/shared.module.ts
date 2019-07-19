import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomMaterialModule} from './modules/custom-material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  exports: [CustomMaterialModule]
})
export class SharedModule { }
