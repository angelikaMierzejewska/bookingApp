import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '../../../../store';
import { map, tap } from 'rxjs/operators';
import { Booking } from '../resources/models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private urlBase = 'http://185.157.80.88:8080';

  constructor(private httpClient: HttpClient, private store: Store) {}

  public booking(data): Observable<any> {
    return this.httpClient.post(this.urlBase + '/api/bookings', data).pipe(tap(response => {}));
  }

  public getAllBooking(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(this.urlBase + '/api/bookings').pipe(
      tap(response => {
        this.store.set('booking', response);
        console.log(this.store);
      })
    );
  }

  // public getAllBooking(): Observable<Booking[]> {
  //   return this.httpClient.get<Booking[]>(this.urlBase + '/api/bookings').pipe(
  //     map(data =>
  //       data.map(booking =>
  //         new Booking().deserialize({
  //           endDate: booking.endDate,
  //           rooms: booking.rooms.map(room => room.id),
  //           startDate: booking.startDate
  //         })
  //       )
  //     ),
  //     tap(response => {
  //       this.store.set('booking', response);
  //     })
  //   );
  // }
}
