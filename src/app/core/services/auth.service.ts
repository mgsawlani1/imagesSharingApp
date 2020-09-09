import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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

  readonly _jsonURL = environment.baseURL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getAuthData(user: User): Observable<any> {
    const url = encodeURI('auth?username=' + user.username + '&password=' + user.password);
    return this.http
      .get<User>(this._jsonURL + url, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  addUser(username: string, password: string): Observable<any> {
    const url = `${this._jsonURL}auth`;
    return this.http
      .post<User>(url, [{ username: username, password: password }], this.httpOptions)
      .pipe(catchError(this.errorHandler));
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
