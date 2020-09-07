import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ImagesService } from './../../core/services/images.service';
import {
  Add,
  AddImageSuccess,
  ADD_IMAGE,
  Delete,
  DeleteImageSuccess,
  DELETE_IMAGE,
  GetImages,
  GET_IMAGES,
  LoadDataSuccess,
  Update,
  UpdateImageSuccess,
  UPDATE_IMAGE,
} from './../actions/image.actions';

@Injectable()
export class ImageEffects {
  constructor(private imageService: ImagesService, private actions: Actions) {}
  @Effect({ dispatch: true })
  GetImages: Observable<any> = this.actions.pipe(
    ofType(GET_IMAGES),
    map((action: GetImages) => action),
    mergeMap((payload) => {
      return this.imageService.getImageData().pipe(
        map((data) => {
          return new LoadDataSuccess(data);
        })
      );
    })
  );

  @Effect({ dispatch: true })
  CreateImages: Observable<any> = this.actions.pipe(
    ofType(ADD_IMAGE),
    map((action: Add) => action.payload),
    mergeMap((payload) => {
      return this.imageService.addImage(payload).pipe(
        map((data) => {
          if (data) {
            return new AddImageSuccess(data);
          }
        })
      );
    })
  );
  @Effect({ dispatch: true })
  DeleteImage: Observable<any> = this.actions.pipe(
    ofType(DELETE_IMAGE),
    map((action: Delete) => action.payload),
    mergeMap((payload) => {
      return this.imageService.deleteImageById(payload).pipe(
        map((data) => {
          return new DeleteImageSuccess();
        })
      );
    })
  );
  @Effect({ dispatch: true })
  UpdateImages: Observable<any> = this.actions.pipe(
    ofType(UPDATE_IMAGE),
    map((action: Update) => action.payload),
    mergeMap((payload) => {
      return this.imageService.updateImage(payload).pipe(
        map((data) => {
          if (data) {
            return new UpdateImageSuccess(data);
          }
        })
      );
    })
  );
}
