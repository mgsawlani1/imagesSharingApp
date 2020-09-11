import { Image } from '../../core/models/image';
import * as ImageAction from '../actions/image.actions';
import { DELETE_IMAGE, DELETE_IMAGE_SUCCESS, UPDATE_IMAGE_SUCCESS } from '../actions/image.actions';
import { ADD_IMAGE, GET_IMAGES } from './../actions/image.actions';

export interface State {
  image: Image[];
  success: boolean | null;
  message: string | null;
}
export const initialState: State = {
  image: [],
  message: null,
  success: null,
};

export function imageReducer(state: State = initialState, action: ImageAction.ImageActions): State {
  switch (action.type) {
    case ADD_IMAGE: {
      return {
        ...state,
      };
    }
    case GET_IMAGES: {
      return {
        ...state,
      };
    }
    case DELETE_IMAGE: {
      return {
        ...state,
      };
    }
    case ImageAction.UPDATE_IMAGE: {
      return {
        ...state,
      };
    }
    case ImageAction.DATA_LOAD: {
      return {
        image: action.payload,
        message: null,
        success: null,
      };
    }
    case ImageAction.ADD_IMAGE_SUCCESS: {
      return {
        image: [...state.image, action.payload],
        message: 'The image is added successfully!',
        success: true,
      };
    }
    case UPDATE_IMAGE_SUCCESS: {
      return {
        ...state,
        message: 'The image is updated successfully!',
        success: true,
      };
    }
    case DELETE_IMAGE_SUCCESS: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}
