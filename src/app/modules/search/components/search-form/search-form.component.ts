import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { from, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { distinct, filter, map, startWith, tap, toArray } from 'rxjs/operators';
import { Hotel } from '../../resources/models/hotel.model';
import { HotelService } from '../../services/hotel.service';
import { Router } from '@angular/router';
import { Store } from '../../../../../store';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Input() hotels: Hotel[];
  //
  // @Output() search = new EventEmitter<string>();

  //private hotels: Hotel[];
  private filterHotels: Hotel[];
  private locations: string[] = [];
  private locationControl = new FormControl();
  private filteredOptions: Observable<string[]>;

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
}
