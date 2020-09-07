import { Action } from '@ngrx/store';
import { User } from '../../core/models/user';

export const Login_Session = '[Login] login';
export const Logout_Session = '[Login] logout';

export class LoggedIn implements Action {
  readonly type = Login_Session;

  constructor(public payload: User) {}
}

export type Actions = LoggedIn;
