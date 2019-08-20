import { Component, Input, OnInit } from '@angular/core';
import { filter, map, take } from 'rxjs/operators';
import { Store } from '../../../../../store';
import { UserBooking } from '../../../search/resources/interfaces/user-booking.interface';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  displayedColumns: string[] = ['startDate', 'endDate', 'rooms', 'show'];
  dataSource: UserBooking[] = [];

  @Input() userName: string;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getAllUserBooking();
  }

  getAllUserBooking(): void {
    this.store
      .select<UserBooking[]>('booking')
      .pipe(
        filter(val => val.length > 0),
        take(1),
        map((bookings: UserBooking[]) =>
          bookings.filter((val: UserBooking) => val.user === this.userName)
        )
      )
      .subscribe((booking: UserBooking[]) => {
        this.dataSource = booking;
      });
  }
}
