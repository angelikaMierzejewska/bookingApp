import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { User } from '../../resources/models/User';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: ['', [Validators.email]],
    username: ['', [Validators.required, Validators.maxLength(16)]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8)
        // Validators.pattern('(.*[A-Z].*)')
      ]
    ],
    rememberMe: false
  });
  private isLoading = false;
  private registerForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private userDataService: UserDataService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  public ngOnInit(): void {}

  public submit(): void {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.isLoading = true;

      this.userDataService.loginUser(this.loginForm.value).subscribe(
        data => {
          this.isLoading = false;
          console.log('POST Request is successful ', data);
          localStorage.setItem('token', data.id_token);
          const decoded = jwt_decode(data.id_token);
          console.log(decoded);
          this.getUser(this.loginForm.value.username);
          this.dialogRef.close();
        },
        error => {
          console.log('Error', error);
        }
      );
    }
  }

  public getUser(username: string) {
    this.userDataService.getUser(username);
  }

  toggleForm(): void {
    this.registerForm = !this.registerForm;
  }
}
