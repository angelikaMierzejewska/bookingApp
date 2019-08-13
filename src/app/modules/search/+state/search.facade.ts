import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { searchQuery } from './search.selectors';
import { HotelPartialState } from './search.reducer';
import { fromSearchActions } from './search.actions';

@Injectable()
export class SearchFacade {
  hotels$ = this.store.pipe(select(searchQuery.getHotels));
  hotelsLoading$ = this.store.pipe(select(searchQuery.getHotelsLoading));
  hotelsLoadError$ = this.store.pipe(select(searchQuery.getHotelsLoadError));

  bookings$ = this.store.pipe(select(searchQuery.getBookings));
  bookingsLoading$ = this.store.pipe(select(searchQuery.getBookingsLoading));
  bookingsLoadError$ = this.store.pipe(select(searchQuery.getBookingsLoadError));

  constructor(private store: Store<HotelPartialState>) {}

  getHotels(): void {
    this.store.dispatch(new fromSearchActions.GetHotels());
  }
  getBookings(): void {
    this.store.dispatch(new fromSearchActions.GetBookings());
  }
}
