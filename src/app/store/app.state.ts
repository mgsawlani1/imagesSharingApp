import { createFeatureSelector } from '@ngrx/store';
import { User } from './../core/models/user';
import { imageReducer } from './reducers/image.reducer';
import { reducer } from './reducers/login.reducer';

export interface AppState {
  readonly login: User[];
}

export const reducers = {
  login: reducer,
  image: imageReducer,
};

export const selectAuthState = createFeatureSelector<AppState>('login');
export const imageState = createFeatureSelector<AppState>('image');
