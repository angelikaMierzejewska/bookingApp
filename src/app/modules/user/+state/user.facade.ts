import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { itemQuery } from './user.selectors';
import { ItemPartialState } from './user.reducer';
import { fromUserActions } from './user.actions';
import { LoginUserInterface } from '../resources/interfaces/login-user.interface';
import { BookingDate } from '../../search/resources/interfaces/booking-date.interface';
import { fromSearchActions } from '../../search/+state/search.actions';
import { User } from '../resources/models/User';
import { Observable } from 'rxjs';

@Injectable()
export class UserFacade {
  user$ = this.store.pipe(select(itemQuery.getUser));
  userLoading$ = this.store.pipe(select(itemQuery.getItemsLoading));
  userLoadError$ = this.store.pipe(select(itemQuery.getItemsLoadError));
  token$ = this.store.pipe(select(itemQuery.getToken));

  constructor(private store: Store<ItemPartialState>) {}

  getUser(): void {
    this.store.dispatch(new fromUserActions.GetUser());
  }

  loginUser(user: LoginUserInterface): void {
    this.store.dispatch(new fromUserActions.LoginUser(user));
  }

  setToken(token: string) {
    this.store.dispatch(new fromUserActions.SetToken(token));
  }

  setUser(user: User) {
    this.store.dispatch(new fromUserActions.SetUser(user));
  }
}
