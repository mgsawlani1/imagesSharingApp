import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ImagesService } from '../core/services/images.service';
//import * as ImageAction from '../store/actions/image.actions';
import { AppState, selectAuthState } from '../store/app.state';
import { Delete, GetImages } from './../store/actions/image.actions';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesListComponent implements OnInit {
  images: any;

  getState: Observable<any>;

  // isAuthUser: boolean;

  isAuthenticated: boolean;
  errorMessage: string | null;

  constructor(
    private router: Router,
    private imgService: ImagesService,
    private _routeParams: ActivatedRoute,
    private store: Store<AppState>
  ) {
    // this.isAuthUser = _routeParams.snapshot.params['isAuthUser'];
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.images = state.image;
      this.errorMessage = state.errorMessage;
    });
    this.store.dispatch(new GetImages());
    this.store.subscribe(
      (data) => {
        this.images = data.image.image;
      },
      (error) => {
        window.alert(error.status);
      }
    );
  }

  delete(id: number): any {
    const confirmation = window.confirm('Are you sure you want to delete this image?');
    if (confirmation) {
      this.store.dispatch(new Delete(id));
      this.store.dispatch(new GetImages());
    }
  }
}
