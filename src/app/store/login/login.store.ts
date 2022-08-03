import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectloginState, selectToken, selectUsername } from './login.reducer';

@Injectable({
  providedIn: 'root',
})
export class LoginStore {
  loginState$ = this.store.select(selectloginState);
  username$ = this.store.select(selectUsername);
  token$ = this.store.select(selectToken);

  constructor(private store: Store) {}
}
