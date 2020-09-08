import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { ImagesService } from '../core/services/images.service';
import { LogIn, LogInFailure } from '../store/actions/login.actions';
import { AppState, selectAuthState } from './../store/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  images: any;

  username: string;

  loginForm: FormGroup;

  submitted = false;

  isAuthUser: boolean;

  getState: Observable<any>;

  errorMessage: string;

  constructor(
    private router: Router,
    private imgService: ImagesService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.setLoginForm();
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    this.errorMessage = undefined;
  }

  setLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get form(): any {
    return this.loginForm.controls;
  }

  onSubmit(): any {
    // this.setUserData();
    const userData = this.loginForm.value;
    if (this.loginForm.invalid) {
      this.store.dispatch(new LogInFailure(userData));
    } else {
      this.store.dispatch(new LogIn(userData));
      this.router.navigate(['/image', { isAuthUser: true }]);
    }
  }
}
