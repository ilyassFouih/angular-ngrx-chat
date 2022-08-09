import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as LoginActions from './login.actions';
import {
  selectloginState,
  selectToken,
  selectUserData,
  selectUserId,
  selectUsername,
} from './login.reducer';
@Injectable({
  providedIn: 'root',
})
export class LoginStore {
  readonly loginState$ = this.store.select(selectloginState);
  readonly userData$ = this.store.select(selectUserData);
  readonly userId$ = this.store.select(selectUserId);
  readonly username$ = this.store.select(selectUsername);
  readonly token$ = this.store.select(selectToken);

  constructor(private store: Store) {}

  login(username: string, password: string): void {
    this.store.dispatch(
      LoginActions.login({
        username,
        password,
      })
    );
  }

  changeUsername(username: string): void {
    this.store.dispatch(LoginActions.usernameChange({ username }));
  }
}
