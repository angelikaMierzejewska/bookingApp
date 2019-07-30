import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../resources/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlBase = 'http://185.157.80.88:8080';
  public user = new Subject<User>();

  constructor(private httpClient: HttpClient) {}

  public isAuthenticated(): Observable<any> {
    return this.httpClient.get(this.urlBase + '/api/authenticate', { responseType: 'text' });
  }
}
