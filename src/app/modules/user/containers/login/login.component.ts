import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { User } from '../../resources/models/User';
import { Store } from '../../../../../store';

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
  private token$: Observable<string>;
  private user$: Observable<User>;
  constructor(
    private formBuilder: FormBuilder,
    private userDataService: UserDataService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.token$ = this.store.select<string>('token');
    this.user$ = this.store.select<User>('user');
  }

  public submit(): void {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.isLoading = true;
      if (this.registerForm) {
        this.userDataService.registerUser(this.loginForm.value).subscribe();
      } else {
        const login = {
          username: this.loginForm.value.login,
          password: this.loginForm.value.password,
          rememberMe: this.loginForm.value.rememberMe
        };

        this.userDataService.loginUser(login).subscribe(
          data => {
            localStorage.setItem('token', data.id_token);
            this.dialogRef.close();
          },
          error => {
            console.log('Error', error);
          }
        );
      }
    }
  }

  toggleForm(): void {
    this.registerForm = !this.registerForm;
  }
}
