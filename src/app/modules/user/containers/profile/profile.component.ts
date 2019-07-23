import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../resources/models/User';
import { MatDialog } from '@angular/material';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  private user: User;

  constructor(private dialog: MatDialog, private userService: UserDataService) {}

  ngOnInit() {
    this.user = this.userService.getUserFromLocalStorage();
    console.log(this.user);
    this.userSubscription();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  public userSubscription(): void {
    this.userSub = this.userService.user.subscribe(user => {
      this.user = user;
      console.log(user);
    });
  }
}
