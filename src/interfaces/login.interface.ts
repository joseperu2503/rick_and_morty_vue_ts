export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginError {
  email?: string[];
  password?: string[];
}
