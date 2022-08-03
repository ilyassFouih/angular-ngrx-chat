import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as LoginActions from './login.actions';
import { LoginService } from './login.service';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.login),
      exhaustMap(({ username, password }) =>
        this.loginService.login({ username, password }).pipe(
          map(token => LoginActions.loginSuccess({ username, token })),
          tap(() => this.router.navigate(['chat'])),
          catchError((error: unknown) =>
            of(
              LoginActions.loginFailure({
                errorMsg: this.getErrorMessage(error),
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router
  ) {}

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
}
