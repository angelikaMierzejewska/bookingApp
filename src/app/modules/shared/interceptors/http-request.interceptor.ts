import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return next.handle(
      localStorage.getItem('token') ? request.clone({ setHeaders: headers }) : request
    );
  }
}
