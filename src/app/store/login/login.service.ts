import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, throwError, timer } from 'rxjs';
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

  changeUsername(newUsername: string): Observable<boolean | Error> {
    return timer(2000).pipe(
      switchMap(() => {
        const shallWePass = Math.random() > 0.5;

        // fail
        if (!shallWePass) {
          console.log('%c API error response for username', 'color: red');
          return throwError(() => Error('Unable to change username'));
        }
        // success
        console.log('%c API success response for username', 'color: green');
        return of(true);
      })
    );
  }
}
