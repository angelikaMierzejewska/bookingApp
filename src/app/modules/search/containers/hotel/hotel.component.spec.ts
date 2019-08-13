import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelComponent } from './hotel.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Hotel } from '../../resources/models/hotel.model';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { SearchComponent } from '../search/search.component';
import { FacalitiesComponent } from '../facalities/facalities.component';
import { RoomsComponent } from '../rooms/rooms.component';
import { SearchResultComponent } from '../../components/search-result/search-result.component';
import { AvailableRoomsComponent } from '../../components/available-rooms/available-rooms.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Store } from '../../../../../store';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('HotelComponent', () => {
  let component: HotelComponent;
  let fixture: ComponentFixture<HotelComponent>;
  let mockHotelService;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HotelComponent,
        SearchComponent,
        FacalitiesComponent,
        RoomsComponent,
        SearchResultComponent,
        AvailableRoomsComponent
      ],
      imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        SatNativeDateModule,
        SatDatepickerModule,
        RouterModule,
        HttpClientModule,
        RouterModule.forRoot([])
      ],
      providers: [HttpClient, Store, { provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockHotelService = jasmine.createSpyObj('HotelService', ['getAllHotels', 'getHotel']);
    component = new HotelComponent(mockHotelService, route);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should get hotel', () => {
  //   const hotel: Hotel = {
  //     id: 1101,
  //     name: 'Harmony Hotel',
  //     location: 'Paris',
  //     facilities: [],
  //     rooms: []
  //   };
  //   mockHotelService.getHotel(1101).and.returnValue(of(hotel));
  //   component.id = 1101;
  //   component.getHotelData();
  //
  //   expect(component.hotel).toBe(hotel);
  // });
  //
  // it('inProgress should be true', () => {
  //   component.onBookingRoom(true);
  //   expect(component.inProgress).toBe(true);
  // });
});
