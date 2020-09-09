import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Logout } from '../store/actions/login.actions';
import { AppState, selectAuthState } from '../store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() mode = new EventEmitter<boolean>();

  setDark = false;

  isAuthUser: boolean = true;

  isLogout: boolean;

  user = null;

  errorMessage: string;

  getState: Observable<any>;

  isAuthenticated: false;

  constructor(private router: Router, private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  onChangeToggle(): any {
    this.setDark = !this.setDark;
    this.mode.emit(this.setDark);
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
