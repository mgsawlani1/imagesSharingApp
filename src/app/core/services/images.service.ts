import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../../core/models/image';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  images: any;

  private _jsonURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getImageData(): Observable<Image[]> {
    const getAllImagesUrl = encodeURI('images');
    return this.http.get<Image[]>(`${this._jsonURL}/` + getAllImagesUrl);
  }

  getImageDataById(id): Observable<any> {
    return this.http.get(`${this._jsonURL}/` + 'images/' + id);
  }

  addImage(image: any): Observable<any> {
    return this.http.post(`${this._jsonURL}/` + 'images', image);
  }

  deleteImageById(id: number): Observable<any> {
    return this.http.delete(`${this._jsonURL}/` + 'images/' + id);
  }

  updateImage(image: any): Observable<any> {
    return this.http.put(`${this._jsonURL}/` + 'images/' + image.id, image);
  }
}
