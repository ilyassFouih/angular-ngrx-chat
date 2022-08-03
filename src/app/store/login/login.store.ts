import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY, exhaustMap, map, Observable, tap } from 'rxjs';
import { initialState, LoginState } from './login.model';
import { LoginService } from './login.service';

@Injectable()
export class LoginStore extends ComponentStore<LoginState> {
  readonly username$ = this.select(state => state.username);
  readonly token$ = this.select(state => state.token);

  constructor(private loginService: LoginService, private router: Router) {
    super(initialState);
  }

  login = this.effect(
    (credentials: Observable<{ username: string; password: string }>) =>
      credentials.pipe(
        exhaustMap(({ username, password }) =>
          this.loginService.login({ username, password }).pipe(
            map(token => this.setState({ username, token })),
            tap(() => this.router.navigate(['chat'])),
            catchError((error: unknown) => EMPTY)
          )
        )
      )
  );
}
