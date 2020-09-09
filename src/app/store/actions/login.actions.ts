import { Action } from '@ngrx/store';
import { User } from '../../core/models/user';

export enum AuthActionTypes {
  LOGIN = '[Login] login',
  SIGNUP = '[Login] signup',
  LOGOUT = '[Login]  LogOut',
  LOGIN_SUCCESS = '[Login] Login Success',
  LOGIN_FAILURE = '[Login] Login Failure',
  SIGNUP_SUCCESS = '[Login] SignUp Success',
  SIGNUP_FAILURE = '[Login] SignUp Failure',
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: User) {}
}
export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}
export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: any) {}
}
export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: User) {}
}
export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
  constructor(public payload: any) {}
}
export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}
export type AuthAction =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | Logout;
