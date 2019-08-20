import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultComponent } from './search-result.component';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { RouterModule } from '@angular/router';
import { ToolBarComponent } from '../../../../containers/tool-bar/tool-bar.component';
import { FacalitiesComponent } from '../../containers/facalities/facalities.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultComponent, ToolBarComponent, FacalitiesComponent],
      imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        SatNativeDateModule,
        SatDatepickerModule,
        //RouterModule.forRoot([]),
        RouterTestingModule
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
