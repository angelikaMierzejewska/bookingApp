import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../resources/models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private urlBase = 'http://185.157.80.88:8080';

  constructor(private httpClient: HttpClient) {}

  getAllHotels(): Observable<Hotel[]> {
    return this.httpClient.get<Hotel[]>(this.urlBase + '/api/hotels');
  }
}
