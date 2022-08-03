import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  loginStateSelector,
  tokenSelector,
  usernameSelector,
} from './login.reducer';

@Injectable({
  providedIn: 'root',
})
export class LoginStore {
  loginState$ = this.store.select(loginStateSelector);
  username$ = this.store.select(usernameSelector);
  token$ = this.store.select(tokenSelector);

  constructor(private store: Store) {}
}
