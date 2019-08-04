import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './containers/search/search.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacalitiesComponent } from './containers/facalities/facalities.component';
import { HotelComponent } from './containers/hotel/hotel.component';
import { RoomsComponent } from './containers/rooms/rooms.component';
import { MatNativeDateModule } from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { BookingComponent } from './containers/booking/booking.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { RouterModule } from '@angular/router';
import { AvailableRoomsComponent } from './components/available-rooms/available-rooms.component';

@NgModule({
  declarations: [
    SearchComponent,
    FacalitiesComponent,
    HotelComponent,
    RoomsComponent,
    BookingComponent,
    SearchResultComponent,
    AvailableRoomsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    SatNativeDateModule,
    SatDatepickerModule,
    RouterModule
  ],
  exports: [SearchComponent]
})
export class SearchModule {}
