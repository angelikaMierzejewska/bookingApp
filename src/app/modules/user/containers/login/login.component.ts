import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(16)]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.pattern('(.*[A-Z].*)')]
    ]
  });
  private isLoading = false;
  private registerForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private userDataService: UserDataService,
    private router: Router
  ) {}

  public ngOnInit(): void {}

  public submit(): void {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.isLoading = true;
      console.log('login');
    }
  }

  toggleForm(): void {
    this.registerForm = !this.registerForm;
  }
}
