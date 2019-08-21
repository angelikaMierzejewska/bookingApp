import { fromUserActions } from './user.actions';
import { User } from '../resources/models/User';
import { fromSearchActions } from '../../search/+state/search.actions';

export const USER_FEATURE_KEY = 'user';

export interface ItemPartialState {
  readonly [USER_FEATURE_KEY]: UserState;
}

export interface UserState {
  user: User;
  userLoading: boolean;
  userLoadError: boolean;
  token: string;
  loginUserLoading: boolean;
  loginUserLoadError: boolean;
}

export const initialState: UserState = {
  user: null,
  userLoading: false,
  userLoadError: false,
  token: '',
  loginUserLoading: false,
  loginUserLoadError: false
};

export function userReducer(
  state: UserState = initialState,
  action: fromUserActions.CollectiveType
) {
  switch (action.type) {
    case fromUserActions.Types.GetUser:
      state = { ...state, userLoading: true, userLoadError: false, user: null };
      break;

    case fromUserActions.Types.GetUserSuccess:
      state = { ...state, user: action.payload, userLoading: false };
      break;

    case fromUserActions.Types.GetUserFail:
      state = { ...state, userLoading: false, userLoadError: true };
      break;

    case fromUserActions.Types.LoginUser:
      state = { ...state, userLoading: true, userLoadError: false, user: null };
      break;

    case fromUserActions.Types.LoginUserSuccess:
      state = { ...state, token: action.payload, userLoading: false };
      break;

    case fromUserActions.Types.LoginUserFail:
      state = { ...state, userLoading: false, userLoadError: true };
      break;

    case fromUserActions.Types.SetToken:
      state = { ...state, token: action.payload };
      break;

    case fromUserActions.Types.SetUser:
      state = { ...state, user: action.payload };
      break;
  }

  return state;
}
