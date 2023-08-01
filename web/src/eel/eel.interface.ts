export interface User {
  name: string;
  password: string;
  image: string;
}

export interface AuthUser {
  name: string;
  secret: string;
}

export interface PasswordDto {
  title: string;
  login: string;
  password: string;
  url: string;
  secret: string;
}

export interface Password {
  id: number;
  title: string;
  login: string;
  password: string;
  url: string;
}

export interface UpdatePasswordDto extends Password {
  secret: string;
}
