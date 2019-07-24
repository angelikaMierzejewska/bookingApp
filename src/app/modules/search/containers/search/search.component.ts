import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../resources/models/hotel.model';
import { from, Observable, of } from 'rxjs';
import { distinct, filter, map, startWith, tap, toArray } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '../../../../../store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private hotels: Hotel[];
  private filterHotels: Hotel[];
  private locations: string[] = [];
  private locationControl = new FormControl();
  private filteredOptions: Observable<string[]>;

  private hotelsObs$: Observable<Hotel[]>;

  constructor(private hotelService: HotelService, private router: Router, private store: Store) {}

  ngOnInit() {
    this.getAllHotels();
    this.filteredLocations();
  }

  public getAllHotels(): void {
    this.hotelService.getAllHotels().subscribe(data => {
      this.hotels = data;
      this.filterHotels = data;
      this.getAllLocations();
    });
  }

  public getAllLocations(): void {
    from(this.hotels)
      .pipe(
        map((a: Hotel) => a.location),
        distinct(),
        toArray()
      )
      .subscribe(x => {
        this.locations = x;
        this.filteredLocations();
      });
  }

  public filterHotelByLocation(location: string): void {
    from(this.hotels)
      .pipe(
        map((results: Hotel) => results),
        filter((result: Hotel) => result.location === location),
        toArray()
      )
      .subscribe((data: Hotel[]) => {
        this.filterHotels = data;
        if (data.length === 0) {
          this.filterHotels = this.hotels;
        }
      });
  }

  public filteredLocations(): void {
    this.filteredOptions = this.locationControl.valueChanges.pipe(
      tap((x: string) => this.filterHotelByLocation(x)),
      startWith(''),
      map((value: string) => (value ? this._filter(value) : this.locations.slice()))
    );
  }

  displayFn(location: string | undefined): string | undefined {
    return location ? location : undefined;
  }

  private _filter(location: string): string[] {
    const filterValue = location.toLowerCase();

    return this.locations.filter(
      (option: string) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }
  public showHotel(id: number): void {
    this.router.navigate([`/hotel/${id}`]);
  }
}
