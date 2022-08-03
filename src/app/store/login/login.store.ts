import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, exhaustMap, map, Observable, tap } from 'rxjs';
import { linkToGlobalState } from 'src/app/core/global.store';
import { initialState, LoginState } from './login.model';
import { LoginService } from './login.service';

@Injectable()
export class LoginStore extends ComponentStore<LoginState> {
  readonly username$ = this.select(state => state.username);
  readonly token$ = this.select(state => state.token);

  constructor(
    private loginService: LoginService,
    private router: Router,
    private store: Store
  ) {
    super(initialState);
    linkToGlobalState(this.state$, 'LoginStore', this.store);
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
