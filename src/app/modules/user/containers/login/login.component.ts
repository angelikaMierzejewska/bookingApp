import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { User } from '../../resources/models/User';
import { LoginUserInterface } from '../../resources/interfaces/login-user.interface';
import { UserFacade } from '../../+state/user.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: ['', [Validators.email]],
    login: ['', [Validators.required, Validators.maxLength(16)]],
    password: [
      '',
      [
        Validators.required
        // Validators.minLength(8)
        // Validators.pattern('(.*[A-Z].*)')
      ]
    ],
    imageUrl: [''],
    rememberMe: false
  });
  isLoading = false;
  registerForm = false;
  private token$: Observable<string>;
  private user$: Observable<User>;
  constructor(
    private formBuilder: FormBuilder,
    private userDataService: UserDataService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private userFacade: UserFacade
  ) {}

  public ngOnInit(): void {
    this.token$ = this.userFacade.token$;
    this.user$ = this.userFacade.user$;
  }

  public submit(): void {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.isLoading = true;
      if (this.registerForm) {
        this.userDataService.registerUser(this.loginForm.value).subscribe();
      } else {
        const login: LoginUserInterface = {
          username: this.loginForm.value.login,
          password: this.loginForm.value.password,
          rememberMe: this.loginForm.value.rememberMe
        };
        this.userFacade.loginUser(login);
        this.dialogRef.close();
      }
    }
  }

  toggleForm(): void {
    this.registerForm = !this.registerForm;
  }
}
