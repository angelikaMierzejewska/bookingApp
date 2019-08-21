import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../resources/models/User';
import { UserFacade } from '../../+state/user.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private user$: Observable<User> = this.userFacade.user$;

  constructor(private userFacade: UserFacade) {}

  ngOnInit(): void {}
}
