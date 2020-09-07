import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../core/models/user';
import { AuthService } from '../core/services/auth.service';
import { SignUp } from '../store/actions/login.actions';
import { AppState, selectAuthState } from '../store/app.state';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  users: Observable<User[]>;

  signUpForm: FormGroup;

  submitted = false;

  authUser: any;

  getState: Observable<any>;

  constructor(
    private router: Router,
    private authService: AuthService,
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
  }

  get form(): any {
    return this.signUpForm.controls;
  }

  onSubmit(): any {
    this.submitted = true;
    const user = this.signUpForm.value;
    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return alert('the form is not valid');
    } else {
      this.store.dispatch(new SignUp(user));
      window.alert('Registered Successfully');
      this.router.navigate(['/signup']);
    }
  }
}
