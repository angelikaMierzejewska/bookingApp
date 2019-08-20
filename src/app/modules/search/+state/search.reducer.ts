import { Hotel } from '../resources/models/hotel.model';
import { fromSearchActions } from './search.actions';
import { Booking } from '../resources/models/booking.model';
import { BookingDate } from '../resources/interfaces/booking-date.interface';

export const HOTEL_FEATURE_KEY = 'search';

export interface HotelPartialState {
  readonly [HOTEL_FEATURE_KEY]: SearchState;
}

export interface SearchState {
  hotels: Hotel[];
  hotelsLoading: boolean;
  hotelsLoadError: boolean;

  hotel: Hotel;
  hotelLoading: boolean;
  hotelLoadError: boolean;

  bookingDate: BookingDate;

  bookings: Booking[];
  bookingsLoading: boolean;
  bookingsLoadError: boolean;
}

export const initialState: SearchState = {
  hotels: [],
  hotelsLoading: false,
  hotelsLoadError: false,

  hotel: null,
  hotelLoading: false,
  hotelLoadError: false,

  bookingDate: null,

  bookings: [],
  bookingsLoading: false,
  bookingsLoadError: false
};

export function searchReducer(
  state: SearchState = initialState,
  action: fromSearchActions.CollectiveType
) {
  switch (action.type) {
    case fromSearchActions.Types.GetHotels:
      state = { ...state, hotelsLoading: true, hotelsLoadError: false, hotels: [] };
      break;

    case fromSearchActions.Types.GetHotelsSuccess:
      state = { ...state, hotels: action.payload, hotelsLoading: false };
      break;

    case fromSearchActions.Types.GetHotelsFail:
      state = { ...state, hotelsLoading: false, hotelsLoadError: true };
      break;

    case fromSearchActions.Types.GetHotel:
      state = { ...state, hotelLoading: true, hotelLoadError: false, hotel: null };
      break;

    case fromSearchActions.Types.GetHotelSuccess:
      state = { ...state, hotel: action.payload, hotelLoading: false };
      break;

    case fromSearchActions.Types.GetHotelFail:
      state = { ...state, hotelLoading: false, hotelLoadError: true };
      break;

    case fromSearchActions.Types.SetHotels:
      state = { ...state, hotels: action.payload };
      break;

    case fromSearchActions.Types.SetBookingDate:
      state = { ...state, bookingDate: action.payload };
      break;

    case fromSearchActions.Types.GetBookings:
      state = { ...state, bookingsLoading: true, bookingsLoadError: false, bookings: [] };
      break;

    case fromSearchActions.Types.GetBookingsSuccess:
      state = { ...state, bookings: action.payload, bookingsLoading: false };
      break;

    case fromSearchActions.Types.GetBookingsFail:
      state = { ...state, bookingsLoading: false, bookingsLoadError: true };
      break;
  }

  return state;
}
