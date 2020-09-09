import { Image } from '../../core/models/image';
import { Delete, GetImages, Update } from '../actions/image.actions';
import { imageReducer, State } from './image.reducer';

const initialState: State = {
  image: null,
  success: null,
  message: null,
};
const dummyImage: Image = {
  id: 1,
  name: 'test',
  description: 'test',
  imageUrl: '',
};

describe('action not given', () => {
  it('should return the default state', () => {
    const passedState: State = {
      image: null,
      success: null,
      message: null,
    };
    expect(imageReducer(passedState, Object.assign({}))).toEqual(passedState);
  });
});

describe('GetImages', () => {
  it('should return added image', () => {
    const imageAction = new GetImages();
    const passedState: State = {
      image: null,
      success: null,
      message: null,
    };
    expect(imageReducer(passedState, imageAction)).toEqual(passedState);
  });
});

describe('UpdateImage', () => {
  it('should return added image', () => {
    const imageAction = new Update(dummyImage);
    const passedState: State = {
      image: null,
      success: null,
      message: null,
    };
    expect(imageReducer(passedState, imageAction)).toEqual(passedState);
  });
});

describe('DeleteImage', () => {
  it('should return the message deleted', () => {
    const id = 1;
    const deleteImage = new Delete(id);
    const passedState: State = {
      image: null,
      success: null,
      message: null,
    };
    expect(imageReducer(passedState, deleteImage)).toEqual(passedState);
  });
});
