export interface LoginState {
  userId: string | null;
  username: string | null;
  oldUsername: string | null;
  token: string | null;
}

export interface LoginResponse {
  userId: string;
  token: string;
}

export const initialState: LoginState = {
  userId: null,
  username: null,
  oldUsername: null,
  token: null,
};
