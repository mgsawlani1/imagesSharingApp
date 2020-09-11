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

  readonly jsonURL = environment.baseURL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getAuthData(user: User): Observable<any> {
    const url = encodeURI('auth?email=' + user.email + '&password=' + user.password);
    return this.http
      .get<User>(this.jsonURL + url, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  addUser(email: string, password: string): Observable<any> {
    const url = `${this.jsonURL}auth`;
    return this.http
      .post<User>(url, { email, password }, this.httpOptions)
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
