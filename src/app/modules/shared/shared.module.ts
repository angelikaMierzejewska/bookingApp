import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from './modules/custom-material.module';
import { BookingComponent } from './containers/booking/booking.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BookingComponent],
  imports: [CommonModule, CustomMaterialModule, RouterModule],
  exports: [CustomMaterialModule, BookingComponent]
})
export class SharedModule {}
