import { createFeatureSelector } from '@ngrx/store';
import * as image from '../store/reducers/image.reducer';
import * as auth from '../store/reducers/login.reducer';

export interface AppState {
  authState: auth.State;
  image: image.State;
}

export const reducers = {
  auth: auth.reducer,
  image: image.imageReducer,
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const imageState = createFeatureSelector<AppState>('image');
