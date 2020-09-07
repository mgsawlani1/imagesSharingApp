import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../core/models/user';
import { AuthService } from '../core/services/auth.service';
import { ImagesService } from '../core/services/images.service';
import { LogIn } from '../store/actions/login.actions';
import { AppState, selectAuthState } from '../store/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  users: Observable<User[]>;

  images: any;

  username: string;

  loginForm: FormGroup;

  submitted = false;
  error = '';

  isAuthUser: boolean = false;

  getState: Observable<any>;

  errorMessage: string;

  user: User;

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
    console.log('userData', userData);

    if (this.loginForm.invalid) {
      window.alert('the form is not valid');
    } else {
      this.store.dispatch(new LogIn(this.user));
      window.alert('logged in successfully');
      this.router.navigate(['/image', { isAuthUser: true }]);
    }
  }
}
