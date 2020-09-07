import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../core/models/user';
import { AuthService } from '../core/services/auth.service';
import * as LoginActions from '../store/actions/login.actions';
import { AppState } from '../store/app.state';

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
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

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
    }

    //check if user exists
    else {
      this.store.select('login').subscribe(
        (data) => {
          this.authUser = data;
        },

        (error) => {
          console.log('Error : ', error);
          window.alert(error.status);
        }
      );
      const ifUserExist = this.authUser.some(
        (res) => res.username === user.username && res.password === user.password
      );
      if (ifUserExist) {
        alert('user is already registered');
        this.router.navigate(['/login']);
      } else {
        this.store.dispatch(
          new LoginActions.LoggedIn({
            username: user.username,
            password: user.password,
          })
        );
        this.authService.addUser(user).subscribe((users) => {});
        alert('Registered Successfully');
        this.router.navigate(['/login']);
      }
    }
  }
}
