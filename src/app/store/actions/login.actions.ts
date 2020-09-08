import { Action } from '@ngrx/store';
import { User } from '../../core/models/user';

export const LOGIN = '[Login] login';
export const SIGNUP = '[Login] signup';
export const LOGOUT = '[Login]  LogOut';
export const LOGIN_SUCCESS = '[Login] Login Success';
export const LOGIN_FAILURE = '[Login] Login Failure';
export const SIGNUP_SUCCESS = '[Login] SignUp Success';
export const SIGNUP_FAILURE = '[Login] SignUp Failure';

export class LogIn implements Action {
  readonly type = LOGIN;

  constructor(public payload: User) {}
}
export class LogInSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: any) {}
}
export class LogInFailure implements Action {
  readonly type = LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class SignUp implements Action {
  readonly type = SIGNUP;
  constructor(public payload: User) {}
}
export class SignUpSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;
  constructor(public payload: User) {}
}
export class SignUpFailure implements Action {
  readonly type = SIGNUP_FAILURE;
}
export class Logout implements Action {
  readonly type = LOGOUT;
}
export type AuthAction =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | Logout;
