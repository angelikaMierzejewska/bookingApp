import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authSevice: AuthService) {}

  public canActivate() {
    return this.authSevice.isAuthenticated().pipe(
      tap(res => console.log(res)),
      switchMap((res: string) => of(!!res.length))
    );
  }
}
