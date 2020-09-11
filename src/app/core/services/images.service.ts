import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Image } from '../../core/models/image';
import { IImageService } from './images.service.interface';

@Injectable({
  providedIn: 'root',
})
export class ImagesService implements IImageService {
  images: Image;
  readonly jsonURL = environment.baseURL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getImageData(): Observable<Image[]> {
    return this.http.get<Image[]>(this.jsonURL + 'images/').pipe(catchError(this.errorHandler));
  }

  getImageDataById(id: number): Observable<Image> {
    return this.http.get<Image>(this.jsonURL + 'images/' + id).pipe(catchError(this.errorHandler));
  }

  addImage(image: Image): Observable<Image> {
    return this.http
      .post<Image>(this.jsonURL + 'images/', image, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  deleteImageById(id: number): Observable<Image> {
    return this.http
      .delete<Image>(this.jsonURL + 'images/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  updateImage(image: any): Observable<any> {
    return this.http
      .put<Image>(this.jsonURL + 'images/' + image.id, JSON.stringify(image), this.httpOptions)
      .pipe(catchError(this.errorHandler));
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

  errorHandler(error): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
