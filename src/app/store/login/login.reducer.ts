import { createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.actions';

export interface State {
  username: string | null;
  token: string | null;
}

export const initialState: State = {
  username: null,
  token: null,
};

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.loginSuccess, (state, { username, token }) => ({
    ...state,
    username,
    token,
  })),
  on(LoginActions.logout, () => initialState)
);
