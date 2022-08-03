export interface LoginState {
  username: string | null;
  token: string | null;
}

export const initialState: LoginState = {
  username: null,
  token: null,
};
