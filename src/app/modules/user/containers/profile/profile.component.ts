import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../resources/models/User';
import { Store } from '../../../../../store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private user$: Observable<User>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.user$ = this.store.select<User>('user');
  }
}
