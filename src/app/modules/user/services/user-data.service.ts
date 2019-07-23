import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../resources/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private urlBase = 'http://185.157.80.88:8080';
  public user = new Subject<User>();

  constructor(private httpClient: HttpClient) {}

  public loginUser(userLogin): Observable<{ id_token: string }> {
    console.log(userLogin);
    return this.httpClient.post<{ id_token: string }>(
      this.urlBase + '/api/authenticate',
      userLogin
    );
  }

  public registerUser(user) {
    return this.httpClient.post(this.urlBase + '/api/register', user);
  }

  public getUser(username): void {
    this.httpClient.get<User>(this.urlBase + '/api/users/' + username).subscribe(data => {
      localStorage.setItem('user', JSON.stringify(data));
      this.user.next(data);
    });
  }

  public isAuthenticated() {
    return this.httpClient.get(this.urlBase + '/api/authenticate', { responseType: 'text' });
  }

  public getUserFromLocalStorage(): User {
    const data = localStorage.getItem('user');
    return JSON.parse(data);
  }
}
