import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../user/containers/login/login.component';
import { Subscription } from 'rxjs';
import { UserDataService } from '../user/services/user-data.service';
import { User } from '../user/resources/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit, OnDestroy {
  private userSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private userService: UserDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSubscription();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  public userSubscription(): void {
    this.userSub = this.userService.user.subscribe(user => {
      console.log(user);
    });
  }

  onLogin(): void {
    this.dialog.open(LoginComponent, {
      minWidth: 350
    });
  }

  onLogout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // this.router.navigate(['']);
  }
}
