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
import { SearchResultComponent } from './components/search-result/search-result.component';
import { RouterModule } from '@angular/router';
import { AvailableRoomsComponent } from './components/available-rooms/available-rooms.component';
import { SearchFacade } from './+state/search.facade';
import { HOTEL_FEATURE_KEY, searchReducer, initialState } from './+state/search.reducer';
import { StoreModule } from '@ngrx/store';
import { SearchEffects } from './+state/search.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    SearchComponent,
    FacalitiesComponent,
    HotelComponent,
    RoomsComponent,
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
    RouterModule,
    StoreModule.forFeature(HOTEL_FEATURE_KEY, searchReducer, { initialState }),
    EffectsModule.forFeature([SearchEffects])
  ],
  providers: [SearchFacade],
  exports: [SearchComponent]
})
export class SearchModule {}
