import { Component, Input, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { Observable } from 'rxjs';
import { Room } from '../../resources/models/room.model';
import { Store } from '../../../../../store';
import { map } from 'rxjs/operators';
import { BookingService } from '../../services/booking.service';
import { MatSnackBar } from '@angular/material';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../resources/models/hotel.model';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  private rooms: Room[];
  private hotels: Hotel[];
  @Input() hotelId: number;

  constructor(
    private roomService: RoomService,
    private store: Store,
    private bookingService: BookingService,
    private snackBar: MatSnackBar,
    private hotelService: HotelService
  ) {}

  ngOnInit() {
    this.roomService.getAllRooms().subscribe();
    this.hotels = this.store.value.hotels;
    const hotel = this.hotels.find(hotel => hotel.id === this.hotelId);
    this.rooms = hotel.rooms;
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
