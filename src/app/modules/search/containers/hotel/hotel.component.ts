import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from '../../resources/models/hotel.model';
import { SearchFacade } from '../../+state/search.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  id: number;
  inProgress = false;
  hotel$: Observable<Hotel>;

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private searchFacade: SearchFacade
  ) {}

  ngOnInit(): void {
    this.getHotelData();
  }

  getHotelData(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.hotel$ = this.searchFacade.getHotel$(this.id);
  }

  onBookingRoom(booking: boolean): void {
    this.inProgress = booking;
  }
}
