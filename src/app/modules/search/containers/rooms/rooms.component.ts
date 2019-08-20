import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { Room } from '../../resources/models/room.model';
import { Store } from '../../../../../store';
import { filter, map, take } from 'rxjs/operators';
import { BookingService } from '../../services/booking.service';
import { MatSnackBar } from '@angular/material';
import { Hotel } from '../../resources/models/hotel.model';
import { UserBooking } from '../../resources/interfaces/user-booking.interface';
import { Observable } from 'rxjs';
import { SearchFacade } from '../../+state/search.facade';
import { BookingDate } from '../../resources/interfaces/booking-date.interface';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  disableButton = false;
  @Input() rooms: Room[];
  @Output() bookRoom = new EventEmitter<boolean>();
  bookingD: Observable<BookingDate>;

  constructor(
    private roomService: RoomService,
    private store: Store,
    private bookingService: BookingService,
    private snackBar: MatSnackBar,
    private searchFacade: SearchFacade
  ) {}

  ngOnInit(): void {
    this.bookingD = this.searchFacade.getBookingDate();
  }

  onBooking(id: number): void {
    if (this.store.value.user) {
      const bookingRoom: Room[] = [];
      bookingRoom.push(this.rooms.find(room => room.id === id));

      const data: UserBooking = {
        user: this.store.value.user.login,
        endDate: this.store.value.bookingDate.end,
        startDate: this.store.value.bookingDate.begin,
        rooms: bookingRoom
      };
      this.toggleBooking(true);

      this.bookingService.booking(data).subscribe(
        (response: UserBooking) => {
          this.updateStore(response);
          this.toggleBooking(false);

          this.openSnackBar('Booking done', 'X');
        },
        error => {}
      );
    } else {
      this.openSnackBar('You must login', 'X');
    }
  }

  toggleBooking(val: boolean): void {
    this.bookRoom.emit(val);
    this.disableButton = val;
  }

  updateStore(response: UserBooking): void {
    this.store
      .select<Hotel[]>('hotels')
      .pipe(take(1))
      .subscribe(
        hotels => {
          const hotel = hotels.find(h => h.id === response.rooms[0].hotel.id);
          const room = hotel.rooms.find(r => r.id === response.rooms[0].id);
          room.booked = true;
          this.store.set('hotels', hotels);
        },
        error => {}
      );
  }

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }
}
