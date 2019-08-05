import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacalitiesComponent } from './facalities.component';

describe('FacalitiesComponent', () => {
  let component: FacalitiesComponent;
  let fixture: ComponentFixture<FacalitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacalitiesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
