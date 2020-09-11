import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  AuthActionTypes,
  LogIn,
  LogInFailure,
  LogInSuccess,
  SignUp,
  SignUpFailure,
  SignUpSuccess,
} from '../actions/login.actions';
import { AuthService } from './../../core/services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions: Actions, private authService: AuthService, private router: Router) {}

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap((payload) => {
      return this.authService.getAuthData(payload).pipe(
        map((user) => {
          if (user.length > 0) {
            return new LogInSuccess({ email: payload.email });
          } else {
            return new LogInFailure({ error: 'Invalid credentials' });
          }
        })
      );
    })
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('user', JSON.stringify(user.payload));
      window.alert('Logged in successfully');
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    tap((err) => {
      this.authService.errorMessage = err.payload.error;
      window.alert('Invalid Credentials');
    })
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap((payload) => {
      return this.authService
        .addUser(payload.email, payload.password)
        .pipe(
          map((user) => {
            return new SignUpSuccess({
              email: payload.email,
              password: payload.password,
            });
          })
        )
        .pipe(
          catchError((error) => {
            return of(new SignUpFailure({ error }));
          })
        );
    })
  );
  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      localStorage.setItem('user', user.payload);
      window.alert('Registered successfully');
      window.alert('Please login to see details');
      this.router.navigateByUrl('login');
    })
  );
  /**
   * TODO: Combine signupFailure and login failure to create a single effect
   */
  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE),
    tap((user) => {})
  );

  @Effect({ dispatch: false })
  Logout: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('user');
    })
  );
}
