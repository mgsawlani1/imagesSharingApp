import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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

  isAuthenticated: boolean;

  errorMessage: string | null;

  constructor(private router: Router, private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getAllImages();
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.errorMessage = state.errorMessage;
    });
  }

  getAllImages(): any {
    this.store.dispatch(new GetImages());
    this.store.subscribe((data) => {
      this.images = data.image.image;
    });
  }
  delete(id: number): any {
    const confirmation = window.confirm('Are you sure you want to delete this image?');
    if (confirmation) {
      this.store.dispatch(new Delete(id));
      window.alert('Image Deleted');
      this.store.dispatch(new GetImages());
      this.router.navigate(['/image']);
    }
  }
}
