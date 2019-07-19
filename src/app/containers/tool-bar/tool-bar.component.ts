import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../modules/user/containers/login/login.component';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  onLogin(): void {
    this.dialog.open(LoginComponent, {
      minWidth: 350
    });
  }
}
