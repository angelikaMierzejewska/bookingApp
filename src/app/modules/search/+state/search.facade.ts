import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { searchQuery } from './search.selectors';
import { HotelPartialState } from './search.reducer';
import { fromSearchActions } from './search.actions';
import { Observable } from 'rxjs';
import { Hotel } from '../resources/models/hotel.model';
import { Room } from '../resources/models/room.model';
import { BookingDate } from '../resources/interfaces/booking-date.interface';

@Injectable()
export class SearchFacade {
  hotels$ = this.store.pipe(select(searchQuery.getHotels));
  hotelsLoading$ = this.store.pipe(select(searchQuery.getHotelsLoading));
  hotelsLoadError$ = this.store.pipe(select(searchQuery.getHotelsLoadError));

  bookings$ = this.store.pipe(select(searchQuery.getBookings));
  bookingsLoading$ = this.store.pipe(select(searchQuery.getBookingsLoading));
  bookingsLoadError$ = this.store.pipe(select(searchQuery.getBookingsLoadError));

  constructor(private store: Store<HotelPartialState>) {}

  getHotel$(id): Observable<Hotel> {
    return this.store.pipe(select(searchQuery.getHotel(id)));
  }

  getBookingDate() {
    return this.store.pipe(select(searchQuery.getBookingDate()));
  }

  getRoomsByHotel(id): Observable<Room[]> {
    return this.store.pipe(select(searchQuery.getRoomsByHotel(id)));
  }

  getHotels(): void {
    this.store.dispatch(new fromSearchActions.GetHotels());
  }
  getBookings(): void {
    this.store.dispatch(new fromSearchActions.GetBookings());
  }

  setBookingDate(date: BookingDate) {
    this.store.dispatch(new fromSearchActions.SetBookingDate(date));
  }

  setHotels(hotels: Hotel[]) {
    this.store.dispatch(new fromSearchActions.SetHotels(hotels));
  }
}
