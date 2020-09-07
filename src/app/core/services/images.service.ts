import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  images: any;
  private _jsonURL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getImageData(): Observable<any> {
    return this.http.get(`${this._jsonURL}/` + 'images');
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
