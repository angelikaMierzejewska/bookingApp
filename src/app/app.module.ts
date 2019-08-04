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

@NgModule({
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
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
