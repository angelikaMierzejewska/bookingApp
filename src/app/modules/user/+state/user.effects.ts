// import { Injectable } from '@angular/core';
// import { Actions, Effect, ofType } from '@ngrx/effects';
// import { catchError, map, switchMap } from 'rxjs/operators';
// import { of } from 'rxjs';
// import {fromUserActions} from './user.actions';
// import {UserDataService} from '../services/user-data.service';
//
// @Injectable()
// export class ItemEffects {
//   @Effect()
//   getItems$ = this.actions$.pipe(
//     ofType(fromUserActions.Types.GetUser),
//     switchMap(() => {
//       return this.userDataService.getUser().pipe(
//         map(items => new fromItemActions.GetItemsSuccess(items)),
//         catchError(() => of(new fromItemActions.GetItemsFail()))
//       );
//     })
//   );
//
//   constructor(private actions$: Actions, private userDataService: UserDataService) {}
// }
