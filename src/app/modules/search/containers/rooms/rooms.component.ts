import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Room } from '../../resources/models/room.model';
import { take } from 'rxjs/operators';
import { BookingService } from '../../services/booking.service';
import { MatSnackBar } from '@angular/material';
import { UserBooking } from '../../resources/interfaces/user-booking.interface';
import { SearchFacade } from '../../+state/search.facade';
import { BookingDate } from '../../resources/interfaces/booking-date.interface';
import { Observable } from 'rxjs';
import { User } from '../../../user/resources/models/User';
import { UserFacade } from '../../../user/+state/user.facade';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  @Input() rooms: Room[];
  @Output() bookRoom = new EventEmitter<boolean>();
  bookingDate: BookingDate;
  disableButton = false;
  private user$: Observable<User> = this.userFacade.user$;
  private user: User;

  constructor(
    private bookingService: BookingService,
    private snackBar: MatSnackBar,
    private searchFacade: SearchFacade,
    private userFacade: UserFacade
  ) {}

  ngOnInit(): void {
    this.getBookingDate();
    this.user$.subscribe(val => (this.user = val));
  }

  getBookingDate(): void {
    this.searchFacade
      .getBookingDate()
      .pipe(take(1))
      .subscribe(val => (this.bookingDate = val));
  }

  onBooking(id: number): void {
    if (this.user) {
      const bookingRoom: Room[] = [];
      bookingRoom.push(this.rooms.find(room => room.id === id));

      const data: UserBooking = {
        user: this.user.login,
        endDate: this.bookingDate.end,
        startDate: this.bookingDate.begin,
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
    let hotelsArray = [];
    this.searchFacade.hotels$.subscribe(
      hotels => (hotelsArray = JSON.parse(JSON.stringify(hotels)))
    );

    const hotel = hotelsArray.find(h => h.id === response.rooms[0].hotel.id);
    const room = hotel.rooms.find(r => r.id === response.rooms[0].id);
    room.booked = true;
    this.searchFacade.setHotels(hotelsArray);
  }

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }
}
