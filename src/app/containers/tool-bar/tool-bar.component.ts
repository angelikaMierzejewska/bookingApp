import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../modules/user/containers/login/login.component';
import { Subscription } from 'rxjs';
import { UserDataService } from '../../modules/user/services/user-data.service';
import { User } from '../../modules/user/resources/models/User';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  private user: User;

  constructor(private dialog: MatDialog, private userService: UserDataService) {}

  ngOnInit() {
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

  onLogin(): void {
    this.dialog.open(LoginComponent, {
      minWidth: 350
    });
  }
}
