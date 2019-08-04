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

//
// this.bookingService.getAllBooking().subscribe(data => {
//   const bookings: Booking[] = data;
//   const hotels: Hotel[] = this.store.value.hotels;
//
//   const start = moment(this.date.begin).format('YYYY-MM-DD');
//   const end = moment(this.date.begin).format('YYYY-MM-DD');
//
//   const bookedRooms = bookings.filter(
//     booking =>
//       (moment(booking.startDate).format('YYYY-MM-DD') <= start &&
//         moment(booking.endDate).format('YYYY-MM-DD') >= start) ||
//       (moment(booking.startDate).format('YYYY-MM-DD') >= start &&
//         moment(booking.endDate).format('YYYY-MM-DD') <= end) ||
//       (moment(booking.startDate).format('YYYY-MM-DD') <= end &&
//         moment(booking.endDate).format('YYYY-MM-DD') <= end)
//   );
//   // hotels.find(hotel=> hotel.rooms.find(roo))
//   // rooms.find(room => room.id === x.id);
//   // const room = rooms.find(room => room.id === x.id);
//   // room.booked = true;
//   // console.log(room);
//   const rooms = this.store.value.rooms;
//   let freeRooms = [];
//   bookedRooms.map(booking =>
//     booking.rooms.map(r => {
//       console.log(r);
//       console.log(hotels);
//
//       freeRooms = rooms.filter(room => room.id !== r.id);
//       console.log(freeRooms);
//     })
//   );
//   // this.store.set('rooms', rooms);
//
//   console.log(bookedRooms);
// });

// const example = zip(
//   this.hotels$,
//   this.booking$
// ).pipe(
//   map(([hotels, booking]) => ({ hotels, booking })),
// )
// example.subscribe(val => {
//   console.log(val)
// });
