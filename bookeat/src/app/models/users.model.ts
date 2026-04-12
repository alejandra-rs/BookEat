export interface User {
  id: string | number;
  name: string;
  surname: string;
  birthdate: string;
  accountName: string;
  email: string;
  phoneNumber: string;
  image: string;
}

export interface RegisterForm {
  name: string;
  surname: string;
  birthdate: string;
  accountName: string;
  email: string;
  phoneNumber: number;
  password: string;
  confirmPassword: string;
}
