import { User } from '../../core/models/user';
import {
  LogIn,
  LogInFailure,
  LogInSuccess,
  Logout,
  SignUpFailure,
  SignUpSuccess,
} from '../actions/login.actions';
import { reducer, State } from './login.reducer';

const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};
const dummyUser: User = {
  email: 'test',
  password: 'test123',
};
const validatedUser: User = {
  email: 'test',
  password: 'test123',
};
const invalidUser: User = {
  email: 'aa@zz.com',
  password: 'test1233',
};
describe('action not given', () => {
  it('should return the default state when no action given', () => {
    const passedState: State = {
      isAuthenticated: true,
      user: null,
      errorMessage: null,
    };
    expect(reducer(passedState, Object.assign({}))).toEqual(passedState);
  });
});

describe('LogIn', () => {
  it('should return the user post verifying the user credentials', () => {
    const loginAction = new LogIn(dummyUser);
    const passedState: State = {
      isAuthenticated: true,
      user: dummyUser,
      errorMessage: null,
    };
    expect(reducer(passedState, loginAction)).toEqual(passedState);
  });
});

describe('LogInSuccess', () => {
  it('should return the validated user after login successful', () => {
    const loginAction = new LogInSuccess(dummyUser);
    const passedState: State = {
      isAuthenticated: true,
      user: validatedUser,
      errorMessage: null,
    };
    expect(reducer(passedState, loginAction)).toEqual(passedState);
  });
});

describe('LogInFailure', () => {
  it('should return the message stating that the credentials are invalid', () => {
    const loginAction = new LogInFailure(dummyUser);
    const username = 'test';
    const password = 'test123';
    const passedState: State = {
      isAuthenticated: null,
      user: dummyUser,
      errorMessage: undefined,
    };
    expect(reducer(passedState, loginAction)).toEqual(username);
  });
});

describe('registerSuccess', () => {
  it('should return the message stating that the credentials are invalid', () => {
    const SignUpSuccessAction = new SignUpSuccess(dummyUser);
    const passedState: State = {
      isAuthenticated: true,
      user: dummyUser,
      errorMessage: null,
    };
    expect(reducer(passedState, SignUpSuccessAction)).toEqual(passedState);
  });
});

describe('registerFailure', () => {
  it('should return the message stating that the credentials are invalid', () => {
    const SignUpSuccessAction = new SignUpFailure('user');
    const passedState: State = {
      isAuthenticated: true,
      user: invalidUser,
      errorMessage: 'The user is already Registered',
    };
    expect(reducer(passedState, SignUpSuccessAction)).toEqual(passedState);
  });
});

describe('Logout', () => {
  it('should return the message stating that the credentials are invalid', () => {
    const logoutAction = new Logout();
    const passedState: State = {
      isAuthenticated: false,
      user: dummyUser,
      errorMessage: '',
    };
    expect(reducer(initialState, logoutAction)).toEqual(initialState);
  });
});
