import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../resources/models/hotel.model';
import { tap } from 'rxjs/operators';
import { Store } from '../../../../store';
import { Room } from '../resources/models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private urlBase = 'http://185.157.80.88:8080';

  constructor(private httpClient: HttpClient, private store: Store) {}

  public getAllRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.urlBase + '/api/rooms').pipe(
      tap(response => {
        this.store.set('rooms', response);
        console.log(response);
        console.log(this.store);
      })
    );
  }
}
