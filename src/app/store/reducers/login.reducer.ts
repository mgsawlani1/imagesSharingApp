import { User } from '../../core/models/user';
import * as LoginAction from '../actions/login.actions';
import { AuthAction, LOGIN_SUCCESS, LOGOUT } from './../actions/login.actions';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}
export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};

export function reducer(state = initialState, action: AuthAction): State {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          username: action.payload.name,
          password: action.payload.password,
        },
        errorMessage: null,
      };
    }
    case LoginAction.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.',
      };
    }
    case LoginAction.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        errorMessage: null,
      };
    }
    case LoginAction.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: 'The user is already Registered.',
      };
    }
    case LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
