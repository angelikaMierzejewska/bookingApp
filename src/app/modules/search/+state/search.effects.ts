import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { fromSearchActions } from './search.actions';
import { HotelService } from '../services/hotel.service';
import { BookingService } from '../services/booking.service';

@Injectable()
export class SearchEffects {
  @Effect()
  getHotels$ = this.actions$.pipe(
    ofType(fromSearchActions.Types.GetHotels),
    switchMap(() => {
      return this.hotelService.getAllHotels().pipe(
        map(items => new fromSearchActions.GetHotelsSuccess(items)),
        catchError(() => of(new fromSearchActions.GetHotelsFail()))
      );
    })
  );

  @Effect()
  getBookings$ = this.actions$.pipe(
    ofType(fromSearchActions.Types.GetBookings),
    switchMap(() => {
      return this.bookingService.getAllBooking().pipe(
        map(items => new fromSearchActions.GetBookingsSuccess(items)),
        catchError(() => of(new fromSearchActions.GetBookingsFail()))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private hotelService: HotelService,
    private bookingService: BookingService
  ) {}
}
