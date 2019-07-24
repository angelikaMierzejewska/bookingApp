import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './containers/search/search.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacalitiesComponent } from './containers/facalities/facalities.component';
import { HotelComponent } from './containers/hotel/hotel.component';
import { RoomsComponent } from './containers/rooms/rooms.component';

@NgModule({
  declarations: [SearchComponent, FacalitiesComponent, HotelComponent, RoomsComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  exports: [SearchComponent]
})
export class SearchModule {}
