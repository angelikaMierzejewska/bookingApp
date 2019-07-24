import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../resources/models/hotel.model';
import { tap } from 'rxjs/operators';
import { Store } from '../../../../store';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private urlBase = 'http://185.157.80.88:8080';

  constructor(private httpClient: HttpClient, private store: Store) {}

  getAllHotels(): Observable<Hotel[]> {
    return this.httpClient
      .get<Hotel[]>(this.urlBase + '/api/hotels')
      .pipe(tap(response => this.store.set('hotels', response)));
  }

  getFacalities(): Observable<any> {
    return this.httpClient
      .get(this.urlBase + '/api/facalities')
      .pipe(tap(response => this.store.set('facalities', response)));
  }

  getHotel(id: number) {
    return this.httpClient.get(this.urlBase + '/api/hotels/' + id);
  }
}
