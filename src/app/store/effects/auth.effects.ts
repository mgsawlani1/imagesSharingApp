// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  LOGIN,
  LogIn,
  LogInFailure,
  LogInSuccess,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP,
  SignUp,
  SignUpSuccess,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
} from '../actions/login.actions';
import { AuthService } from './../../core/services/auth.service';

@Injectable()
export class AuthEffects {
  /**
   *
   */
  constructor(private actions: Actions, private authService: AuthService, private router: Router) {}
  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('user', JSON.stringify(user.payload));
      window.alert('Logged in successfully');
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(LOGIN_FAILURE),
    tap((err) => {
      this.authService.errorMessage = err.payload.error;
      window.alert('Invalid Credentials');
    })
  );

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(LOGIN),
    map((action: LogIn) => action.payload),
    switchMap((payload) => {
      return this.authService.getAuthData(payload).pipe(
        map((user) => {
          if (user.length > 0) {
            return new LogInSuccess({ username: payload.username });
          } else {
            return new LogInFailure({ error: 'Invalid credentials' });
          }
        })
      );
    })
  );

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(SIGNUP_SUCCESS),
    tap((user) => {
      localStorage.setItem('user', user.payload);
      window.alert('Registered successfully');
      this.router.navigateByUrl('login');
    })
  );
  /**
   * TODO: Combine signupFailure and login failure to create a single effect
   */
  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(SIGNUP_FAILURE),
    tap((user) => {})
  );
  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap((payload) => {
      return this.authService.addUser(payload).pipe(
        map((data) => {
          return new SignUpSuccess(data);
        })
      );
    })
  );

  @Effect({ dispatch: false })
  Logout: Observable<any> = this.actions.pipe(
    ofType(LOGOUT),
    tap((user) => {
      localStorage.removeItem('user');
    })
  );
}
