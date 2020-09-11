import { Observable } from 'rxjs';
import { Image } from '../../core/models/image';

export interface IImageService {
  getImageData(): Observable<Image[]>;
}
