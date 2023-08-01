import {
  AuthUser,
  Password,
  PasswordDto,
  UpdatePasswordDto,
  User,
} from "./eel.interface";

interface EelPythonFunctions {
  get_all_py: () => () => User[];
  add_new_user_py: (
    name: string,
    password: string,
    img: string
  ) => () => boolean;
  login_py: (name: string, password: string) => () => AuthUser;
  gen_password_py: () => () => string;
  add_new_pass_py: (data: PasswordDto, user_name: string) => () => boolean;
  get_all_passwords_py: (user_name: string) => () => Password[];
  delete_password_py: (user_name: string, el_id: number) => () => string;
  decrypt_password_py: (
    user_name: string,
    el_id: number,
    secret: string
  ) => () => Password;
  update_password_py: (
    data: UpdatePasswordDto,
    user_name: string
  ) => () => string;
}

export type EelResponse<T> = Partial<{
  error: string;
  errorTrace: string;
  data: T;
}>;

const eelEndpoints: EelPythonFunctions = window["eel" as keyof typeof window];

export async function get_all_py(): Promise<EelResponse<User[]>> {
  try {
    var k = await eelEndpoints.get_all_py()();
  } catch (e) {
    return {
      error: e.errorText,
      errorTrace: e.errorTraceback,
    };
  }
  return { data: k };
}

export async function add_new_user_py(
  name: string,
  password: string,
  img: string
): Promise<EelResponse<boolean>> {
  try {
    var k = await eelEndpoints.add_new_user_py(name, password, img)();
  } catch (e) {
    return {
      error: e.errorText,
      errorTrace: e.errorTraceback,
    };
  }
  return { data: k };
}

export async function login_py(
  name: string,
  password: string
): Promise<EelResponse<AuthUser>> {
  try {
    var k = await eelEndpoints.login_py(name, password)();
  } catch (e) {
    return {
      error: e.errorText,
      errorTrace: e.errorTraceback,
    };
  }
  return { data: k };
}

export async function gen_password_py(): Promise<EelResponse<string>> {
  try {
    var k = await eelEndpoints.gen_password_py()();
  } catch (e) {
    return {
      error: e.errorText,
      errorTrace: e.errorTraceback,
    };
  }
  return { data: k };
}

export async function add_new_pass_py(
  data: PasswordDto,
  user_name: string
): Promise<EelResponse<boolean>> {
  try {
    var k = await eelEndpoints.add_new_pass_py(data, user_name)();
  } catch (e) {
    return {
      error: e.errorText,
      errorTrace: e.errorTraceback,
    };
  }
  return { data: k };
}

export async function get_all_passwords_py(
  user_name: string
): Promise<EelResponse<Password[]>> {
  try {
    var k = await eelEndpoints.get_all_passwords_py(user_name)();
  } catch (e) {
    return {
      error: e.errorText,
      errorTrace: e.errorTraceback,
    };
  }
  return { data: k };
}

export async function delete_password_py(
  user_name: string,
  el_id: number
): Promise<EelResponse<string>> {
  try {
    var k = await eelEndpoints.delete_password_py(user_name, el_id)();
  } catch (e) {
    return {
      error: e.errorText,
      errorTrace: e.errorTraceback,
    };
  }
  return { data: k };
}

export async function decrypt_password_py(
  user_name: string,
  el_id: number,
  secret: string
): Promise<EelResponse<Password>> {
  try {
    var k = await eelEndpoints.decrypt_password_py(user_name, el_id, secret)();
  } catch (e) {
    return {
      error: e.errorText,
      errorTrace: e.errorTraceback,
    };
  }
  return { data: k };
}

export async function update_password_py(
  data: UpdatePasswordDto,
  user_name: string
): Promise<EelResponse<string>> {
  try {
    var k = await eelEndpoints.update_password_py(data, user_name)();
  } catch (e) {
    return {
      error: e.errorText,
      errorTrace: e.errorTraceback,
    };
  }
  return { data: k };
}
