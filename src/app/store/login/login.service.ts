import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginResponse } from './login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly URL = 'to-do';

  constructor(private http: HttpClient) {}

  /**
   *
   * @param credentials
   * @returns token string
   */
  login(credentials: {
    username: string;
    password: string;
  }): Observable<LoginResponse> {
    return of({ userId: crypto.randomUUID(), token: 'dummy-token' });
    // return this.http
    //   .post(this.URL, { params: credentials })
    //   .pipe(map(() => 'to-do token selection from header'));
  }
}
