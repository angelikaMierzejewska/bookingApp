import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { RouterModule } from '@angular/router';
import { Store } from '../../../../../store';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpRequestInterceptor } from '../../../shared/interceptors/http-request.interceptor';
import { SearchResultComponent } from '../../components/search-result/search-result.component';
import { FacalitiesComponent } from '../facalities/facalities.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Hotel } from '../../resources/models/hotel.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent, SearchResultComponent, FacalitiesComponent],
      imports: [
        HttpClientModule,
        CommonModule,
        BrowserAnimationsModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        SatNativeDateModule,
        SatDatepickerModule,
        // RouterModule.forRoot([]),
        RouterTestingModule
      ],

      providers: [
        Store,
        { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should return all unique locations', async () => {
  //   const hotels: Hotel[] = [
  //     { id: 1101, name: 'Harmony Hotel', location: 'Warsaw', facilities: [], rooms: [] },
  //     { id: 1102, name: 'Harmony Hotel2', location: 'London', facilities: [], rooms: [] },
  //     { id: 1103, name: 'Harmony Hotel3', location: 'Warsaw', facilities: [], rooms: [] }
  //   ];
  //   component.hotels$ = of(hotels);
  //   component.getAllLocations();
  //   expect(component.locations.length).toBe(2);
  // });
});
