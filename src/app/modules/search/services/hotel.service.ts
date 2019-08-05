import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Hotel } from '../resources/models/hotel.model';
import { groupBy, map, mergeMap, tap, toArray } from 'rxjs/operators';
import { Store } from '../../../../store';
import { RoomService } from './room.service';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private urlBase = 'http://185.157.80.88:8080';

  constructor(
    private httpClient: HttpClient,
    private store: Store,
    private roomService: RoomService
  ) {}

  getAllHotels(): Observable<Hotel[]> {
    return this.httpClient.get<Hotel[]>(this.urlBase + '/api/hotels').pipe(
      tap(response => {
        this.roomService.getAllRooms().subscribe(data => {
          from(data)
            .pipe(
              tap(room => {
                room.booked = false;
              }),
              groupBy(room => room.hotel.id),
              mergeMap(group => group.pipe(toArray())),
              map(x => {
                const hotel: Hotel = response.find(h => h.id === x[0].hotel.id);
                hotel.rooms = x;
              }),
              tap(() => this.store.set('hotels', response))
            )
            .subscribe();
        });
      })
    );
  }

  getHotel(id: number) {
    return this.httpClient.get(this.urlBase + '/api/hotels/' + id);
  }
}
