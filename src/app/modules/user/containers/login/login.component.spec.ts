import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../../shared/modules/custom-material.module';
import { RouterModule } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Store } from '../../../../../store';
import { MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockUserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        RouterModule.forRoot([]),
        BrowserAnimationsModule
      ],
      providers: [
        UserDataService,
        HttpClient,
        HttpHandler,
        Store,
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockUserService = jasmine.createSpyObj('UserService', ['loginUser', 'registerUser', 'getUser']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalide', async(() => {
    component.loginForm.controls['firstName'].setValue('');
    component.loginForm.controls['lastName'].setValue('');
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['login'].setValue('');
    component.loginForm.controls['password'].setValue('');

    expect(component.loginForm.valid).toBeFalsy();
  }));

  it('form should be valid', async(() => {
    component.loginForm.controls['firstName'].setValue('aaa');
    component.loginForm.controls['lastName'].setValue('aa');
    component.loginForm.controls['email'].setValue('aaa@wp.pl');
    component.loginForm.controls['login'].setValue('aaa');
    component.loginForm.controls['password'].setValue('aa');

    expect(component.loginForm.valid).toBeTruthy();
  }));

  it('form should be invalide', async(() => {
    component.loginForm.controls['firstName'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  }));

  it('should toggle registerForm ', () => {
    component.registerForm = false;
    component.toggleForm();
    expect(component.registerForm).toBeTruthy();
  });

  // it('should loggin user', () => {
  //   const token = {
  //     id_token:
  //       'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmdlbGlrYSIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU2NTY5ODk2MX0.ykyLnrXZftQMhgdrhBFs865VWmlMwBcHJUARQ3-ZEov9f8tFYXHyrKbGHBqgSY7nJYHsQvOWvBX9mqPyW0pmpg'
  //   };
  //   component.loginForm.controls['login'].setValue('angelika');
  //   component.loginForm.controls['password'].setValue('angelika');
  //   component.submit();
  //
  //   component.registerForm = false;
  //   mockUserService.loginUser.and.returnValue(token);
  //   expect(component)
  // });
});
