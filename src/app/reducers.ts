import { ActionReducerMap } from '@ngrx/store';
import { searchReducer } from './modules/search/+state/search.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { appReducer, AppState } from './+state/app.reducer';

export interface State {
  app: AppState;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  app: appReducer,
  router: routerReducer
};
