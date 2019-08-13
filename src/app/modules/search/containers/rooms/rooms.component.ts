import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { Room } from '../../resources/models/room.model';
import { Store } from '../../../../../store';
import { filter, take } from 'rxjs/operators';
import { BookingService } from '../../services/booking.service';
import { MatSnackBar } from '@angular/material';
import { Hotel } from '../../resources/models/hotel.model';
import { UserBooking } from '../../resources/interfaces/user-booking.interface';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  rooms: Room[];
  disableButton = false;
  @Input() hotelId: number;
  @Output() bookRoom = new EventEmitter<boolean>();

  constructor(
    private roomService: RoomService,
    private store: Store,
    private bookingService: BookingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.store
      .select<Hotel[]>('hotels')
      .pipe(filter((hotels: Hotel[]) => hotels.length > 0))
      .subscribe(
        (hotels: Hotel[]) => {
          const hotel: Hotel = hotels.find((val: Hotel) => val.id === this.hotelId);
          this.rooms = hotel.rooms;
        },
        error => console.log(error)
      );
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
        error => console.log(error)
      );
    } else {
      this.openSnackBar('You must login', 'X');
    }
  }

  toggleBooking(val: boolean) {
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
        error => console.log(error)
      );
  }

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }
}
