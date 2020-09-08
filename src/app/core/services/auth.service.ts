import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private errorStatusMessage: string;
  get errorMessage(): string {
    return this.errorStatusMessage;
  }

  set errorMessage(msg: string) {
    this.errorStatusMessage = msg;
  }
  private _jsonURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAuthData(user: User): Observable<any> {
    return this.http.get(`${this._jsonURL}/` + 'auth').pipe(catchError(this.errorCatcher));
  }
  addUser(user: any): Observable<any> {
    return this.http.post(`${this._jsonURL}/` + 'auth', user).pipe(catchError(this.errorCatcher));
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
