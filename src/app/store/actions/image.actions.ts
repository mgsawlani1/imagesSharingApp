import { Action } from '@ngrx/store';
import { Image } from '../../core/models/image';

export const ADD_IMAGE = '[Image] ADD';
export const GET_IMAGES = '[Image] GET';
export const UPDATE_IMAGE = '[Image] UPDATE';
export const DELETE_IMAGE = '[Image] DELETE';
export const DATA_LOAD = '[Image] LOAD';

export const ADD_IMAGE_SUCCESS = '[IMAGE] ADD IMAGE SUCCESS';
export const UPDATE_IMAGE_SUCCESS = '[IMAGE] UPDATE IMAGE SUCCESS';
export const DELETE_IMAGE_SUCCESS = '[IMAGE] DELETE IMAGE SUCCESS';

export class Add implements Action {
  readonly type = ADD_IMAGE;
  constructor(public payload: Image) {}
}
export class GetImages implements Action {
  readonly type = GET_IMAGES;
  constructor() {}
}
export class Update implements Action {
  readonly type = UPDATE_IMAGE;

  constructor(public payload: Image) {}
}
export class Delete implements Action {
  readonly type = DELETE_IMAGE;
  constructor(public payload: number) {}
}

export class LoadDataSuccess implements Action {
  readonly type = DATA_LOAD;
  constructor(public payload: Image[]) {}
}
export class AddImageSuccess implements Action {
  readonly type = ADD_IMAGE_SUCCESS;
  constructor(public payload: Image) {}
}
export class UpdateImageSuccess implements Action {
  readonly type = UPDATE_IMAGE_SUCCESS;
  constructor(public payload: Image) {}
}
export class DeleteImageSuccess implements Action {
  readonly type = DELETE_IMAGE_SUCCESS;
}

export type ImageActions =
  | Add
  | GetImages
  | Update
  | Delete
  | LoadDataSuccess
  | UpdateImageSuccess
  | AddImageSuccess
  | DeleteImageSuccess;
