import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HOTEL_FEATURE_KEY, SearchState } from './search.reducer';

const getSearchState = createFeatureSelector<SearchState>(HOTEL_FEATURE_KEY);

const getHotels = createSelector(
  getSearchState,
  state => state.hotels
);
const getHotelsLoading = createSelector(
  getSearchState,
  state => state.hotelsLoading
);
const getHotelsLoadError = createSelector(
  getSearchState,
  state => state.hotelsLoadError
);

const getBookings = createSelector(
  getSearchState,
  state => state.bookings
);
const getBookingsLoading = createSelector(
  getSearchState,
  state => state.hotelsLoading
);
const getBookingsLoadError = createSelector(
  getSearchState,
  state => state.hotelsLoadError
);

export const searchQuery = {
  getHotels,
  getHotelsLoading,
  getHotelsLoadError,
  getBookings,
  getBookingsLoading,
  getBookingsLoadError
};
