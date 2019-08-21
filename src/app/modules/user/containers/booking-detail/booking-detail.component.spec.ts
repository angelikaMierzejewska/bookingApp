import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDetailComponent } from './booking-detail.component';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../../shared/modules/custom-material.module';
import { UserDataService } from '../../services/user-data.service';
import { HttpClient } from '@angular/common/http';
import { AppModule } from '../../../../app.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookingDetailComponent', () => {
  let component: BookingDetailComponent;
  let fixture: ComponentFixture<BookingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AppModule,
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        // RouterModule.forRoot([])
        RouterTestingModule
      ],
      providers: [UserDataService, HttpClient, { provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
    fixture = TestBed.createComponent(BookingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(BookingDetailComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
