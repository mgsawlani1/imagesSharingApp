import { createFeatureSelector } from '@ngrx/store';
import * as image from '../store/reducers/image.reducer';
import * as auth from '../store/reducers/login.reducer';

export interface AppState {
  // loginState: auth.State
  image: image.State;
}

export const reducers = {
  auth: auth.reducer,
  image: image.imageReducer,
};

export const selectAuthState = createFeatureSelector<AppState>('login');
export const imageState = createFeatureSelector<AppState>('image');
