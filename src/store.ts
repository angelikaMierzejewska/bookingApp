import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { Hotel } from './app/modules/search/resources/models/hotel.model';
import { User } from './app/modules/user/resources/models/User';
import { Room } from './app/modules/search/resources/models/room.model';
import { BookingDate } from './app/modules/search/resources/interfaces/bookingDate.interface';
import { Booking } from './app/modules/search/resources/models/booking.model';

interface InitialState {
  isLogedin: boolean;
  hotels: Hotel[];
  user: User;
  token: string;
  rooms: Room[];
  bookingDate: BookingDate;
  booking: Booking[];
}

const initialState: InitialState = {
  isLogedin: false,
  hotels: [],
  user: null,
  token: '',
  rooms: [],
  bookingDate: null,
  booking: []
};

export class Store {
  private subject = new BehaviorSubject<InitialState>(initialState);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, newStateVal: any) {
    this.subject.next({ ...this.subject.value, [name]: newStateVal });
  }
}
