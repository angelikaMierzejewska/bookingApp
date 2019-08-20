import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '../../../../store';
import { Facility } from '../resources/models/facility.model';

@Injectable({
  providedIn: 'root'
})
export class FacalitiesServices {
  private urlBase = 'http://185.157.80.88:8080';

  constructor(private httpClient: HttpClient, private store: Store) {}

  getFacalities(): Observable<Facility[]> {
    return this.httpClient
      .get<Facility[]>(this.urlBase + '/api/facalities')
      .pipe(tap(response => this.store.set('facalities', response)));
  }
}
