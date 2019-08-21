import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../modules/user/resources/models/User';
import { LoginComponent } from '../../modules/user/containers/login/login.component';
import { UserDataService } from '../../modules/user/services/user-data.service';
import { UserFacade } from '../../modules/user/+state/user.facade';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
  private user$: Observable<User> = this.userFacade.user$;
  constructor(
    private dialog: MatDialog,
    private userService: UserDataService,
    private router: Router,
    private userFacade: UserFacade
  ) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.dialog.open(LoginComponent, {
      minWidth: 350
    });
  }

  onLogout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userFacade.setUser(null);
    this.userFacade.setToken(null);
    this.router.navigate(['/']);
  }
}
