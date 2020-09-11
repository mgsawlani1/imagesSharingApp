import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Image } from '../../core/models/image';
import { IImageService } from './images.service.interface';

@Injectable({
  providedIn: 'root',
})
export class ImagesService implements IImageService {
  images: Image[] = [
    {
      id: 1,
      name: 'Nature',
      description:
        'Nature, in the broadest sense, is the natural, physical, or material world or universe. Nature can refer to the phenomena of the physical world, and also to life in general. ... Although humans are part of nature, human activity is often understood as a separate category from other natural phenomena',
      imageUrl: 'assets/nature.jpg',
    },
    {
      id: 2,
      name: 'Sunset',
      description: 'sunset',
      imageUrl: 'assets/sunset.jpg',
    },
  ];
  getImageData(): Observable<Image[]> {
    return of(this.images);
  }
  addImage(image: Image): any {
    this.images.push(image);
  }
}
