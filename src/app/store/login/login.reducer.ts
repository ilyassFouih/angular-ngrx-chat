import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as LoginActions from './login.actions';
import { initialState, LoginState } from './login.model';

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.loginSuccess, (state, { username, token }) => ({
    ...state,
    username,
    token,
  })),
  on(LoginActions.logout, () => initialState)
);

export function reducer(state: LoginState | undefined, action: Action) {
  return loginReducer(state, action);
}

export const selectloginState = createFeatureSelector<LoginState>('login');
export const selectUsername = createSelector(
  selectloginState,
  state => state.username
);
export const selectToken = createSelector(
  selectloginState,
  state => state.token
);
