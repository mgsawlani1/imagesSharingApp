import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../core/models/user';
import { AuthService } from '../core/services/auth.service';
import { ImagesService } from '../core/services/images.service';
import { AppState } from '../store/app.state';

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
  loading = false;
  submitted = false;
  error = '';
  authUser: any;
  isAuthUser: boolean;
  constructor(
    private router: Router,
    private imgService: ImagesService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    store.select('login').subscribe((data) => {});
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get form(): any {
    return this.loginForm.controls;
  }

  onSubmit(): any {
    this.submitted = true;
    const user = this.loginForm.value;
    if (this.loginForm.invalid) {
      return (this.loading = true);
    } else {
      this.store.select('login').subscribe((data) => {
        this.authUser = data;
      });
      const ifUserExist = this.authUser.some((res) => res.username === user.username);
      if (ifUserExist) {
        alert('logged in successfully');
        this.router.navigate(['/image', { isAuthUser: false }]);
        this.store.select('login').subscribe((data) => {
          console.log('users', data);
        });
      } else {
        alert('user is not registered');
        this.router.navigate(['/signup']);
      }
    }
  }
}
