import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ImagesService } from '../core/services/images.service';
import * as ImageAction from '../store/actions/image.actions';
import { AppState, imageState } from '../store/app.state';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesListComponent implements OnInit {
  images: any;

  getState: Observable<any>;

  createImage: boolean;

  isAuthUser: boolean;

  constructor(
    private router: Router,
    private imgService: ImagesService,
    private _routeParams: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.isAuthUser = _routeParams.snapshot.params['isAuthUser'];
    this.getState = this.store.select(imageState);
  }

  ngOnInit(): void {
    this.getAllImages();
    this.createImage = false;
    this.store.subscribe(
      (data) => {
        this.images = data.image.image;
      },
      (error) => {
        console.log('Error : ', error);
        window.alert(error.status);
      }
    );
  }

  getAllImages(): void {
    this.store.dispatch(new ImageAction.GetImages());
  }

  delete(id: number): any {
    if (!this.isAuthUser) {
      window.alert('Please Login to Edit data');
    }
    const confirmation = window.confirm('Are you sure you want to delete this image?');

    this.imgService.deleteImageById(id).subscribe(
      (image) => {
        this.router.navigate(['/image', { isAuthUser: false }]);
      },
      (error) => {
        console.log('Error : ', error);
        window.alert(error);
      }
    );
    this.store.dispatch(new ImageAction.GetImages());
  }
}
