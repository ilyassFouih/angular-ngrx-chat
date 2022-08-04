import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectloginState,
  selectToken,
  selectUserId,
  selectUsername,
} from './login.reducer';

@Injectable({
  providedIn: 'root',
})
export class LoginStore {
  readonly loginState$ = this.store.select(selectloginState);
  readonly userId$ = this.store.select(selectUserId);
  readonly username$ = this.store.select(selectUsername);
  readonly token$ = this.store.select(selectToken);

  constructor(private store: Store) {}
}
