import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { Hotel } from './app/modules/search/resources/models/hotel.model';

interface InitialState {
  isLogedin: boolean;
  hotels: Hotel[];
  animals: any[];
}

const initialState: InitialState = {
  isLogedin: false,
  hotels: [],
  animals: []
};

export class Store {
  private subject = new BehaviorSubject<InitialState>(initialState);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, newStateVal: any) {
    this.subject.next({ ...this.subject.value, [name]: newStateVal });
  }
}
