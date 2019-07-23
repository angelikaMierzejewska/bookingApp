import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../resources/models/hotel.model';
import { from, Observable } from 'rxjs';
import { distinct, distinctUntilChanged, filter, map, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private hotels: Hotel[];
  private locations: string[] = [];

  constructor(private hotelService: HotelService) {}

  ngOnInit() {
    this.getAllHotels();
  }

  getAllHotels() {
    this.hotelService.getAllHotels().subscribe(data => {
      this.hotels = data;
      this.getAllLocations();
    });
  }

  getAllLocations(): void {
    from(this.hotels)
      .pipe(
        map(a => a.location),
        distinct(),
        toArray()
      )
      .subscribe(val => {
        this.locations = val;
      });
  }
}
