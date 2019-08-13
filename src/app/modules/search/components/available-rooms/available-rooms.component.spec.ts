import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableRoomsComponent } from './available-rooms.component';
import { SearchComponent } from '../../containers/search/search.component';
import { FacalitiesComponent } from '../../containers/facalities/facalities.component';
import { HotelComponent } from '../../containers/hotel/hotel.component';
import { RoomsComponent } from '../../containers/rooms/rooms.component';
import { SearchResultComponent } from '../search-result/search-result.component';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { RouterModule } from '@angular/router';

describe('AvailableRoomsComponent', () => {
  let component: AvailableRoomsComponent;
  let fixture: ComponentFixture<AvailableRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        FacalitiesComponent,
        HotelComponent,
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
        RouterModule.forRoot([])
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
