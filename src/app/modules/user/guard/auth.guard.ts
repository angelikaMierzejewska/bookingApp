import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public userService: UserDataService, public router: Router) {}

  public canActivate() {
    return this.userService.isAuthenticated().pipe(
      tap(res => console.log(res)),
      switchMap((res: string) => of(!!res.length))
    );
  }
}
