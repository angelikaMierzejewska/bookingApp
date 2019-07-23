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
    login: ['', [Validators.required, Validators.maxLength(16)]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8)
        // Validators.pattern('(.*[A-Z].*)')
      ]
    ],
    imageUrl: [''],
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
      if (this.registerForm) {
        this.userDataService.registerUser(this.loginForm.value).subscribe(data => {
          console.log(data);
        });
      } else {
        console.log('login');
        const login = {
          username: this.loginForm.value.login,
          password: this.loginForm.value.password,
          rememberMe: this.loginForm.value.rememberMe
        };

        this.userDataService.loginUser(login).subscribe(
          data => {
            console.log(data);
            this.isLoading = false;
            localStorage.setItem('token', data.id_token);
            this.getUser(this.loginForm.value.login);
            this.dialogRef.close();
          },
          error => {
            console.log('Error', error);
          }
        );
      }
    }
  }

  public getUser(username: string) {
    this.userDataService.getUser(username);
  }

  toggleForm(): void {
    this.registerForm = !this.registerForm;
  }
}
