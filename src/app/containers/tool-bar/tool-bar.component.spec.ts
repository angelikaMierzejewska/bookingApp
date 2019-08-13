import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolBarComponent } from './tool-bar.component';
import { AppComponent } from '../../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../modules/shared/shared.module';
import { UserModule } from '../../modules/user/user.module';
import { SearchModule } from '../../modules/search/search.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Store } from '../../../store';
import { HttpRequestInterceptor } from '../../modules/shared/interceptors/http-request.interceptor';

describe('ToolBarComponent', () => {
  let component: ToolBarComponent;
  let fixture: ComponentFixture<ToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, ToolBarComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        UserModule,
        SearchModule,
        HttpClientModule
      ],
      providers: [
        Store,
        { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
