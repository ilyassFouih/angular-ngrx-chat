export interface LoginState {
  userId: string | null;
  username: string | null;
  token: string | null;
}

export interface LoginResponse {
  userId: string;
  token: string;
}

export const initialState: LoginState = {
  userId: null,
  username: null,
  token: null,
};
