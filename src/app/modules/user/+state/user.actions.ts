import { Action } from '@ngrx/store';
import { User } from '../resources/models/User';
import { LoginUserInterface } from '../resources/interfaces/login-user.interface';

export namespace fromUserActions {
  export enum Types {
    GetUser = '[User] Get User',
    GetUserSuccess = '[User] Get User Success',
    GetUserFail = '[User] Get User Fail',

    LoginUser = '[User]  Logim User',
    LoginUserSuccess = '[User] Logim User Success',
    LoginUserFail = '[User] Logim User Fail',

    SetToken = '[User] Set token',
    SetUser = '[User] Set user'
  }

  export class GetUser implements Action {
    readonly type = Types.GetUser;
  }

  export class GetUserSuccess implements Action {
    readonly type = Types.GetUserSuccess;

    constructor(public payload: User) {}
  }

  export class GetUserFail implements Action {
    readonly type = Types.GetUserFail;
  }

  export class LoginUser implements Action {
    readonly type = Types.LoginUser;
    constructor(public payload: LoginUserInterface) {}
  }

  export class LoginUserSuccess implements Action {
    readonly type = Types.LoginUserSuccess;

    constructor(public payload: string) {}
  }

  export class LoginUserFail implements Action {
    readonly type = Types.LoginUserFail;
  }

  export class SetToken implements Action {
    readonly type = Types.SetToken;
    constructor(public payload: string) {}
  }

  export class SetUser implements Action {
    readonly type = Types.SetUser;
    constructor(public payload: User) {}
  }
  export type CollectiveType =
    | GetUser
    | GetUserSuccess
    | GetUserFail
    | LoginUser
    | LoginUserSuccess
    | LoginUserFail
    | SetToken
    | SetUser;
}
