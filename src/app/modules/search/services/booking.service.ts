import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../resources/models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private urlBase = 'http://185.157.80.88:8080';

  constructor(private httpClient: HttpClient) {}

  public booking(data): Observable<any> {
    return this.httpClient.post(this.urlBase + '/api/bookings', data);
  }

  public getAllBooking(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(this.urlBase + '/api/bookings');
  }

  public getBooking(id: number): Observable<Booking> {
    return this.httpClient.get<Booking>(this.urlBase + '/api/bookings/' + id);
  }
}
