import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { LoginService } from './login.service';
import * as LoginActions from './login.actions';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.login),
      exhaustMap(({ username, password }) =>
        this.loginService.login({ username, password }).pipe(
          map((token) => LoginActions.loginSuccess({ username, token })),
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

  constructor(private actions$: Actions, private loginService: LoginService) {}

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
}
