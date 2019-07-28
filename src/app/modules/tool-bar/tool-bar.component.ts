import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../user/containers/login/login.component';
import { Observable, Subscription } from 'rxjs';
import { UserDataService } from '../user/services/user-data.service';
import { User } from '../user/resources/models/User';
import { Router } from '@angular/router';
import { Store } from '../../../store';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
  private user$: Observable<User>;
  constructor(
    private dialog: MatDialog,
    private userService: UserDataService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.user$ = this.store.select<User>('token');
  }


  onLogin(): void {
    this.dialog.open(LoginComponent, {
      minWidth: 350
    });
  }

  onLogout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
