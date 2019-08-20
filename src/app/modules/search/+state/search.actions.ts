import { Action } from '@ngrx/store';
import { Hotel } from '../resources/models/hotel.model';
import { Booking } from '../resources/models/booking.model';

export namespace fromSearchActions {
  export enum Types {
    GetHotels = '[Hotel] Get Hotels',
    GetHotelsSuccess = '[Hotel] Get Hotels Success',
    GetHotelsFail = '[Hotel] Get Hotels Fail',

    GetBookings = '[Booking] Get Bookings',
    GetBookingsSuccess = '[Booking] Get Bookings Success',
    GetBookingsFail = '[Bookings] Get Bookings Fail'
  }

  export class GetHotels implements Action {
    readonly type = Types.GetHotels;
  }

  export class GetHotelsSuccess implements Action {
    readonly type = Types.GetHotelsSuccess;

    constructor(public payload: Hotel[]) {}
  }

  export class GetHotelsFail implements Action {
    readonly type = Types.GetHotelsFail;
  }

  export class GetBookings implements Action {
    readonly type = Types.GetBookings;
  }

  export class GetBookingsSuccess implements Action {
    readonly type = Types.GetBookingsSuccess;

    constructor(public payload: Booking[]) {}
  }

  export class GetBookingsFail implements Action {
    readonly type = Types.GetBookingsFail;
  }

  export type CollectiveType =
    | GetHotels
    | GetHotelsSuccess
    | GetHotelsFail
    | GetBookings
    | GetBookingsSuccess
    | GetBookingsFail;
}
