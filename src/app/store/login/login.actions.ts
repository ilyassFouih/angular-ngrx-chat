import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ username: string; token: string }>()
);

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ errorMsg: string }>()
);

export const logout = createAction('[Login] Logout');
