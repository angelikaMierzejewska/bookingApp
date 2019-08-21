import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_FEATURE_KEY, UserState } from './user.reducer';

const getItemsState = createFeatureSelector<UserState>(USER_FEATURE_KEY);

const getUser = createSelector(
  getItemsState,
  state => state.user
);

const getToken = createSelector(
  getItemsState,
  state => state.token
);

const getItemsLoading = createSelector(
  getItemsState,
  state => state.userLoading
);
const getItemsLoadError = createSelector(
  getItemsState,
  state => state.userLoadError
);

const loginUser = createSelector(
  getItemsState,
  state => state.token
);
const loginUserLoading = createSelector(
  getItemsState,
  state => state.loginUserLoading
);
const loginUserLoadError = createSelector(
  getItemsState,
  state => state.loginUserLoadError
);

export const itemQuery = {
  getUser,
  getToken,
  getItemsLoading,
  getItemsLoadError,
  loginUser,
  loginUserLoading,
  loginUserLoadError
};
