import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../resources/models/hotel.model';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith, take, tap, filter } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '../../../../../store';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../resources/models/booking.model';
import * as moment from 'moment';
import { Room } from '../../resources/models/room.model';
import { SearchFacade } from '../../+state/search.facade';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private filterHotels$: Observable<Hotel[]> = this.searchFasde.hotels$;
  private filteredOptions$: Observable<string[]>;
  hotels$: Observable<Hotel[]> = this.searchFasde.hotels$;
  hotelsLoadError$ = this.searchFasde.hotelsLoadError$;
  hotelsLoading$ = this.searchFasde.hotelsLoading$;

  booking2$ = this.searchFasde.bookings$;

  booking$: Observable<Booking[]>;

  locations: string[] = [];
  private locationControl = new FormControl();
  private minDate = new Date();
  private searchForm = this.formBuilder.group({
    locationControl: new FormControl(),
    date: [
      {
        begin: this.minDate,
        end: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
      }
    ]
  });

  constructor(
    private hotelService: HotelService,
    private router: Router,
    private store: Store,
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private searchFasde: SearchFacade
  ) {}

  ngOnInit() {
    this.searchFasde.getBookings();

    this.searchFasde.getHotels();
    this.store.set('bookingDate', this.searchForm.value.date);

    this.hotels$ = this.store.select<Hotel[]>('hotels');
    this.booking$ = this.store.select<Booking[]>('booking');
    this.filterHotels$ = this.store.select('hotels');

    this.bookingService.getAllBooking().subscribe();
    this.hotelService.getAllHotels().subscribe();
    this.getAllLocations();
    this.filteredLocations();
    this.filterHotelByDate();
  }

  filterHotelByDate(): void {
    console.log('filter');
    const start = moment(this.searchForm.value.date.begin).format('YYYY-MM-DD');
    const end = moment(this.searchForm.value.date.end).format('YYYY-MM-DD');
    combineLatest(this.booking$, this.hotels$)
      .pipe(
        filter(val => val[0].length > 0 && val[1].length > 0),
        take(1)
      )
      .subscribe(([bookings, hotels]) => {
        const bookedRooms: Booking[] = bookings.filter(
          booking =>
            (moment(booking.startDate).format('YYYY-MM-DD') <= start &&
              moment(booking.endDate).format('YYYY-MM-DD') >= start) ||
            (moment(booking.startDate).format('YYYY-MM-DD') >= start &&
              moment(booking.endDate).format('YYYY-MM-DD') <= end) ||
            (moment(booking.startDate).format('YYYY-MM-DD') <= end &&
              moment(booking.endDate).format('YYYY-MM-DD') >= end)
        );
        hotels.map(h => h.rooms.map(room => (room.booked = false)));
        bookedRooms.map((booking: Booking) =>
          booking.rooms.map((r: Room) => {
            const hotelId = r.hotel.id;
            const hotel = hotels.find(h => h.id === hotelId);
            const room = hotel.rooms.find(x => x.id === r.id);
            room.booked = true;
          })
        );
        this.store.set('hotels', hotels);
      });
  }

  public getAllLocations(): void {
    this.hotels$.pipe(map(hotels => hotels.map(hotel => hotel.location))).subscribe(x => {
      this.locations = [...new Set(x)];
      this.filteredLocations();
    });
  }

  public filterHotelByLocation(location: string): void {
    this.filterHotels$ = this.hotels$.pipe(
      map(hotels => hotels.filter(hotel => hotel.location === location)),
      tap(result => {
        console.log(result);
        if (result.length === 0) {
          this.filterHotels$ = this.hotels$;
        }
      })
    );
  }

  public filteredLocations(): void {
    this.filteredOptions$ = this.searchForm.valueChanges.pipe(
      tap(x => {
        this.filterHotelByLocation(x.locationControl);
        this.store.set('bookingDate', x.date);
        this.filterHotelByDate();
      }),
      startWith(''),
      map(value =>
        value.locationControl ? this.filter(value.locationControl) : this.locations.slice()
      )
    );
  }

  displayFn(location: string | undefined): string | undefined {
    return location ? location : undefined;
  }

  private filter(location: string): string[] {
    const filterValue = location.toLowerCase();
    return this.locations.filter(
      (option: string) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
