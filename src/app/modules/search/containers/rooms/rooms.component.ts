import { Component, Input, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { Observable } from 'rxjs';
import { Room } from '../../resources/models/room.model';
import { Store } from '../../../../../store';
import { map } from 'rxjs/operators';
import { BookingService } from '../../services/booking.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  private rooms$: Observable<Room[]>;

  @Input() hotelId: number;

  constructor(
    private roomService: RoomService,
    private store: Store,
    private bookingService: BookingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.roomService.getAllRooms().subscribe();

    this.rooms$ = this.store
      .select<Room[]>('rooms')
      .pipe(map((rooms: Room[]) => rooms.filter((room: Room) => room.hotel.id === this.hotelId)));
  }

  onBooking(id: number) {
    if (this.store.value.user) {
      const rooms = this.store.value.rooms;
      const bookingRoom = [];
      bookingRoom.push(rooms.find(room => room.id === id));

      const data = {
        user: this.store.value.user.login,
        endDate: this.store.value.bookingDate.end,
        startDate: this.store.value.bookingDate.begin,
        rooms: bookingRoom
      };
      this.bookingService.booking(data).subscribe(() => {
        this.openSnackBar('Booking done', 'X');
      });
    } else {
      this.openSnackBar('You must login', 'X');
    }
  }

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }
}
