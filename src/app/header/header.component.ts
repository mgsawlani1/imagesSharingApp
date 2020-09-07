import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthState } from '../store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() mode = new EventEmitter<boolean>();

  getState: Observable<any>;

  setDark = false;

  isAuthUser: boolean = true;

  isLogout: boolean;

  user = null;

  errorMessage: string;

  constructor(private store: Store<AppState>, private router: Router) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {}

  onChangeToggle(): any {
    this.setDark = !this.setDark;
    this.mode.emit(this.setDark);
  }

  logout() {
    this.router.navigate(['/image', { isAuthUser: true }]);
  }
}
