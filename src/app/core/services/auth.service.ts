import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _jsonURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAuthData(): Observable<any> {
    return this.http.get(`${this._jsonURL}/` + 'auth');
  }
  addUser(user: any): Observable<any> {
    return this.http.post(`${this._jsonURL}/` + 'auth', user);
  }
}
