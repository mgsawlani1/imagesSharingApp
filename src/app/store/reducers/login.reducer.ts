import { User } from '../../core/models/user';
import { AuthAction, AuthActionTypes } from './../actions/login.actions';

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
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          email: action.payload.email,
          password: action.payload.password,
        },
        errorMessage: null,
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect name and/or password.',
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        user: {
          email: action.payload.email,
          password: action.payload.password,
        },
        errorMessage: null,
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: 'The user is already Registered.',
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
