import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../resources/models/hotel.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private urlBase = 'http://185.157.80.88:8080';

  constructor(private httpClient: HttpClient) {}

  getAllHotels(): Observable<Hotel[]> {
    return this.httpClient.get<Hotel[]>(this.urlBase + '/api/hotels').pipe(
      tap(response => {
        response.map(hotel => hotel.rooms.map(room => (room.booked = false)));
      })
    );
  }

  getHotel(id: number): Observable<Hotel> {
    return this.httpClient.get<Hotel>(this.urlBase + '/api/hotels/' + id);
  }
}
