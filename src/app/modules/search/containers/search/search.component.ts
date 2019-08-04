import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../resources/models/hotel.model';
import { from, Observable, combineLatest } from 'rxjs';
import { distinct, map, startWith, take, tap, toArray, filter } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '../../../../../store';
import { SatDatepickerInputEvent, SatDatepickerRangeValue } from 'saturn-datepicker';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../resources/models/booking.model';
import * as moment from 'moment';

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
  private minDate = new Date();

  private hotels$: Observable<Hotel[]>;
  private booking$: Observable<Booking[]>;

  private searchForm = this.formBuilder.group({
    locationControl: new FormControl(),
    date: ['']
  });

  private date: SatDatepickerRangeValue<Date> = {
    begin: this.minDate,
    end: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
  };

  constructor(
    private hotelService: HotelService,
    private router: Router,
    private store: Store,
    private formBuilder: FormBuilder,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.store.set('bookingDate', this.date);
    this.getAllHotels();
    this.filteredLocations();
    this.bookingService.getAllBooking().subscribe();
    this.filterBookedRooms();
  }

  onDateChange = (e: SatDatepickerInputEvent<Date>) => {
    this.store.set('bookingDate', e.value);
    this.filterBookedRooms();
  };

  filterBookedRooms(): void {
    this.hotels$ = this.store.select<Hotel[]>('hotels');
    this.booking$ = this.store.select<Booking[]>('booking');
    const start = moment(this.date.begin).format('YYYY-MM-DD');
    const end = moment(this.date.begin).format('YYYY-MM-DD');

    combineLatest(this.booking$, this.hotels$)
      .pipe(take(1))
      .subscribe(([bookings, hotels]) => {
        const bookedRooms = bookings.filter(
          booking =>
            (moment(booking.startDate).format('YYYY-MM-DD') <= start &&
              moment(booking.endDate).format('YYYY-MM-DD') >= start) ||
            (moment(booking.startDate).format('YYYY-MM-DD') >= start &&
              moment(booking.endDate).format('YYYY-MM-DD') <= end) ||
            (moment(booking.startDate).format('YYYY-MM-DD') <= end &&
              moment(booking.endDate).format('YYYY-MM-DD') <= end)
        );
        bookedRooms.map(booking =>
          booking.rooms.map(r => {
            const hotelId = r.hotel.id;
            const hotel = hotels.find(h => h.id === hotelId);
            const room = hotel.rooms.find(x => x.id === r.id);
            room.booked = true;
          })
        );
        this.store.set('hotels', hotels);
      });
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
    this.filteredOptions = this.searchForm.valueChanges.pipe(
      tap(x => {
        this.filterHotelByLocation(x.locationControl);
      }),

      startWith(''),
      map(value =>
        value.locationControl ? this._filter(value.locationControl) : this.locations.slice()
      )
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
