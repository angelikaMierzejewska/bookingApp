import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from '../../resources/models/hotel.model';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  hotel: Hotel;
  id: number;
  inProgress = false;

  constructor(private hotelService: HotelService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getHotelData();
  }

  getHotelData(): void {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.hotelService.getHotel(this.id).subscribe((data: Hotel) => {
      this.hotel = data;
    });
  }

  onBookingRoom(booking: boolean): void {
    this.inProgress = booking;
  }
}
