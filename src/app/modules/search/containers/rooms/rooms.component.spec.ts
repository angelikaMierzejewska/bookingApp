import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsComponent } from './rooms.component';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpHandler } from '@angular/common/http';
import { Store } from '../../../../../store';
import { HttpRequestInterceptor } from '../../../shared/interceptors/http-request.interceptor';
import { RouterTestingModule } from '@angular/router/testing';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsComponent],
      imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        SatNativeDateModule,
        SatDatepickerModule,
        // RouterModule.forRoot([])
        RouterTestingModule
      ],
      providers: [
        Store,
        HttpClient,
        HttpHandler,
        { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
