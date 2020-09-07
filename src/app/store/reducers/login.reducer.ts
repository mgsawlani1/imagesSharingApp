import { User } from '../../core/models/user';
import * as LoginAction from '../actions/login.actions';

const initialState: User = {
  username: 'test',
  password: 'test',
};
export function reducer(state: User[] = [initialState], action: LoginAction.Actions): any {
  // action.type = '[Login] login';
  switch (action.type) {
    case LoginAction.Login_Session:
      return [...state, action.payload];
    default:
      return state;
  }
}
