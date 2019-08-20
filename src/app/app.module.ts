import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { ToolBarComponent } from './containers/tool-bar/tool-bar.component';
import { UserModule } from './modules/user/user.module';
import { SearchModule } from './modules/search/search.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpRequestInterceptor } from './modules/shared/interceptors/http-request.interceptor';
import { Store } from '../store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers } from './reducers';

@NgModule({
  declarations: [AppComponent, ToolBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    UserModule,
    SearchModule,
    HttpClientModule,

    StoreModule.forRoot(reducers, {
      initialState: {},
      runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true }
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 50
    })
  ],
  providers: [Store, { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }],

  bootstrap: [AppComponent]
})
export class AppModule {}
