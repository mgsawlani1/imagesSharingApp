import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    return this.http
      .get<Image[]>(`${this._jsonURL}/` + getAllImagesUrl)
      .pipe(catchError(this.errorCatcher));
  }

  getImageDataById(id): Observable<any> {
    return this.http
      .get(`${this._jsonURL}/` + 'images/' + id)
      .pipe(catchError(this.errorCatcher))
      .pipe(catchError(this.errorCatcher));
  }

  addImage(image: any): Observable<any> {
    return this.http
      .post(`${this._jsonURL}/` + 'images', image)
      .pipe(catchError(this.errorCatcher));
  }

  deleteImageById(id: number): Observable<any> {
    return this.http
      .delete(`${this._jsonURL}/` + 'images/' + id)
      .pipe(catchError(this.errorCatcher));
  }

  updateImage(image: any): Observable<any> {
    return this.http
      .put(`${this._jsonURL}/` + 'images/' + image.id, image)
      .pipe(catchError(this.errorCatcher));
  }
  errorCatcher(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
