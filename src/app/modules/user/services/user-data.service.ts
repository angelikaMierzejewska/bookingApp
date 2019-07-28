import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../resources/models/User';
import {Store} from "../../../../store";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private urlBase = 'http://185.157.80.88:8080';

  constructor(private httpClient: HttpClient, private store: Store) {}

  public loginUser(userLogin): Observable<{ id_token: string }> {
    return this.httpClient
      .post<{ id_token: string }>(this.urlBase + '/api/authenticate', userLogin)
      .pipe(
        tap(response => {
          this.store.set('token', response.id_token);
          this.getUser(userLogin.username).subscribe();
        })
      );
  }

  public registerUser(user) {
    return this.httpClient.post(this.urlBase + '/api/register', user);
  }

  public getUser(username): Observable<User> {
    return this.httpClient.get<User>(this.urlBase + '/api/users/' + username).pipe(
      tap(response => {
        this.store.set('user', response);
      })
    );
  }

  public isAuthenticated() {
    return this.httpClient.get(this.urlBase + '/api/authenticate', { responseType: 'text' });
  }
  public getUserFromLocalStorage(): User {
    const data = localStorage.getItem('user');
    return JSON.parse(data);
  }
}
