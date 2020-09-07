import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ImagesService } from '../core/services/images.service';
import * as ImageAction from '../store/actions/image.actions';
import { AppState } from '../store/app.state';
import { ImageState } from '../store/image.state';
import { imageState } from './../store/app.state';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesListComponent implements OnInit {
  images: any;
  isAuthUser = false;
  getState: Observable<any>;
  createImage: boolean;
  constructor(
    private imgService: ImagesService,
    private _routeParams: ActivatedRoute,
    private store: Store<ImageState>,
    private loginStore: Store<AppState>
  ) {
    this.isAuthUser = _routeParams.snapshot.params['isAuthUser'];
    this.getState = this.store.select(imageState);
  }

  ngOnInit(): void {
    this.getAllQuotes();
    this.createImage = false;
    this.store.subscribe((data) => {
      this.images = data.image;
      console.log('images fromm store', data);
    });
    // this.store.select('image').subscribe((data) => {
    //   this.images = data;
    // });

    // this.imgService.getImageData().subscribe(
    //   (image) => {
    //     this.images = image;
    //   },
    //   (error) => {
    //     console.log('Error : ', error);
    //     window.alert(error.status);
    //   }
    // );
  }
  private getAllQuotes(): void {
    this.store.dispatch(new ImageAction.GetImages());
  }
  delete(id: number): any {
    if (!this.isAuthUser) {
      window.alert('Please Login to Edit data');
    }
    this.store.dispatch(new ImageAction.Delete(id));
    this.imgService.deleteImageById(id).subscribe(
      (image) => {},
      (error) => {
        console.log('Error : ', error);
        window.alert(error.status);
      }
    );
  }
}
