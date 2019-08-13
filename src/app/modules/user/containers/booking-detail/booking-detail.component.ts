import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../search/services/booking.service';
import { Booking } from '../../../search/resources/models/booking.model';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {
  booking: Booking;
  constructor(private route: ActivatedRoute, private bookingService: BookingService) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('bookinId');
    this.bookingService.getBooking(id).subscribe(
      booking => (this.booking = booking),
      error => {
        console.log(error);
      }
    );
    console.log(id);
  }
}
