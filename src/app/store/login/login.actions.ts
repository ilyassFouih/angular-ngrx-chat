import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ userId: string; username: string; token: string }>()
);

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ errorMsg: string }>()
);

export const logout = createAction('[Login] Logout');

// username change actions
export const usernameChange = createAction(
  '[Login] Username Change',
  props<{ username: string }>()
);

export const usernameChangeSuccess = createAction(
  '[Login] Username Change Success'
);

export const usernameChangeFailure = createAction(
  '[Login] Username Change Failure',
  props<{ errorMsg: string }>()
);
