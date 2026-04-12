export interface loginForm {
  email: string;
  password: string;
}

export const INITIAL_LOGIN_STATE: loginForm = {
  email: '',
  password: '',
};

export const loginFields = ['email', 'password'];
