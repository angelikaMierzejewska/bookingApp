import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '../../../store';
import { User } from '../../modules/user/resources/models/User';
import { LoginComponent } from '../../modules/user/containers/login/login.component';
import { UserDataService } from '../../modules/user/services/user-data.service';

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

  ngOnInit(): void {
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
    this.store.set('token', '');
    this.store.set('user', null);
  }
}
