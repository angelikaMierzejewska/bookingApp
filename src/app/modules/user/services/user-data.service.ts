import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../resources/models/User';
import { tap } from 'rxjs/operators';
import { UserFacade } from '../+state/user.facade';
import { SearchFacade } from '../../search/+state/search.facade';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private urlBase = 'http://185.157.80.88:8080';

  constructor(
    private httpClient: HttpClient,
    private userFacade: UserFacade,
    private searchFacade: SearchFacade
  ) {}

  public loginUser(userLogin): Observable<{ id_token: string }> {
    return this.httpClient
      .post<{ id_token: string }>(this.urlBase + '/api/authenticate', userLogin)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.id_token);
          this.userFacade.setToken(response.id_token);
          this.getUserData().subscribe();
          this.searchFacade.getBookings();
          this.searchFacade.getHotels();
        })
      );
  }

  public registerUser(user): Observable<any> {
    return this.httpClient.post(this.urlBase + '/api/register', user);
  }

  public getUser(username): Observable<User> {
    return this.httpClient.get<User>(this.urlBase + '/api/users/' + username).pipe(
      tap((response: User) => {
        localStorage.setItem('user', JSON.stringify(response));
      })
    );
  }

  public getUserData(): Observable<User> {
    return this.httpClient.get<User>(this.urlBase + '/api/account').pipe(
      tap((response: User) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.userFacade.setUser(response);
      })
    );
  }

  public getUserFromLocalStorage(): User {
    const data = localStorage.getItem('user');
    return JSON.parse(data);
  }
}
