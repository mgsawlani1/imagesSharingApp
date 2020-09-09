import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../core/models/user';
import { SignUp } from '../store/actions/login.actions';
import { AppState, selectAuthState } from '../store/app.state';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  users: Observable<User[]>;

  errorMessage: string;

  signUpForm: FormGroup;

  submitted = false;

  getState: Observable<any>;

  isAuthUser: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    this.errorMessage = null;
  }

  get form(): any {
    return this.signUpForm.controls;
  }

  onSubmit(): any {
    const payload = {
      username: this.signUpForm.get('username').value,
      password: this.signUpForm.get('password').value,
    };
    this.store.dispatch(new SignUp(payload));

    // this.submitted = true;
    //const user = this.signUpForm.value;
    // stop here if form is invalid
    // if (this.signUpForm.invalid) {
    //   this.store.dispatch(new SignUpFailure(payload));
    // } else {
    //   this.store.dispatch(new SignUp(payload));
    // }
  }
}
