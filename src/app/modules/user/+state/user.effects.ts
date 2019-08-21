import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { fromUserActions } from './user.actions';
import { UserDataService } from '../services/user-data.service';
import LoginUser = fromUserActions.LoginUser;

@Injectable()
export class UserEffects {
  // @Effect()
  // getItems$ = this.actions$.pipe(
  //   ofType(fromUserActions.Types.GetUser),
  //   switchMap(() => {
  //     return this.userDataService.getUserData().pipe(
  //       map(items => new fromUserActions.GetUserSuccess(items)),
  //       catchError(() => of(new fromUserActions.GetUserFail()))
  //     );
  //   })
  // );

  @Effect()
  loginUser$ = this.actions$.pipe(
    ofType(fromUserActions.Types.LoginUser),
    switchMap((action: LoginUser) => {
      return this.userDataService.loginUser(action.payload).pipe(
        map(token => new fromUserActions.LoginUserSuccess(token.id_token)),
        catchError(() => of(new fromUserActions.GetUserFail()))
      );
    })
  );

  constructor(private actions$: Actions, private userDataService: UserDataService) {}
}
