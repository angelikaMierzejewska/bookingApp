import { Component, Input, OnInit } from '@angular/core';
import { UserBooking } from '../../../search/resources/interfaces/user-booking.interface';
import { SearchFacade } from '../../../search/+state/search.facade';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  displayedColumns: string[] = ['startDate', 'endDate', 'rooms', 'show'];
  dataSource: UserBooking[] = [];

  @Input() userName: string;

  constructor(private searchFacade: SearchFacade) {}

  ngOnInit(): void {
    this.getAllUserBooking();
  }

  getAllUserBooking(): void {
    this.searchFacade.bookings$.subscribe(val => (this.dataSource = val));
  }
}
