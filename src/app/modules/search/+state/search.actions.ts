import { Action } from '@ngrx/store';
import { Hotel } from '../resources/models/hotel.model';
import { Booking } from '../resources/models/booking.model';
import { BookingDate } from '../resources/interfaces/booking-date.interface';

export namespace fromSearchActions {
  export enum Types {
    GetHotels = '[Hotel] Get Hotels',
    GetHotelsSuccess = '[Hotel] Get Hotels Success',
    GetHotelsFail = '[Hotel] Get Hotels Fail',

    GetHotel = '[Hotel] Get Hotel',
    GetHotelSuccess = '[Hotel] Get Hotel Success',
    GetHotelFail = '[Hotel] Get Hotel Fail',

    SetHotels = '[Hotel] set Hotesls',

    SetBookingDate = '[Date] Set booking date',
    GetBookingDate = '[Date] Get booking date',

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

  export class GetHotel implements Action {
    readonly type = Types.GetHotel;
  }

  export class GetHotelSuccess implements Action {
    readonly type = Types.GetHotelSuccess;

    constructor(public payload: Hotel) {}
  }

  export class GetHotelFail implements Action {
    readonly type = Types.GetHotelFail;
  }

  export class SetHotels implements Action {
    readonly type = Types.SetHotels;
    constructor(public payload: Hotel[]) {}
  }

  export class SetBookingDate implements Action {
    readonly type = Types.SetBookingDate;
    constructor(public payload: BookingDate) {}
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
    | GetHotel
    | GetHotelSuccess
    | GetHotelFail
    | SetHotels
    | SetBookingDate
    | GetBookings
    | GetBookingsSuccess
    | GetBookingsFail;
}
