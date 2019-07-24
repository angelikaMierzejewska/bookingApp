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
  private hotel: Hotel;
  constructor(private hotelService: HotelService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getHotelData();
  }

  getHotelData(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.hotelService.getHotel(id).subscribe((data: Hotel) => {
      this.hotel = data;
      console.log(data);
    });
  }
}
