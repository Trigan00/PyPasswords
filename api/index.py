import eel
from src.passwords import *
from src.users import *


@eel.expose
def get_all_py():
    return get_all()


@eel.expose
def add_new_user_py(name: str, password: str, img: str):
    return add_new_user(name, password, img)


@eel.expose
def login_py(name: str, password: str):
    return login(name, password)


@eel.expose
def gen_password_py():
    return gen_password()


@eel.expose
def add_new_pass_py(data: dict[str, str], user_name: str):
    return add_new_pass(data, user_name)


@eel.expose
def get_all_passwords_py(user_name: str):
    return get_all_passwords(user_name)


@eel.expose
def delete_password_py(user_name: str, el_id: int):
    return delete_password(user_name, el_id)


@eel.expose
def decrypt_password_py(user_name: str, el_id: int, secret: str):
    return decrypt_password(user_name, el_id, secret)


@eel.expose
def update_password_py(data: dict[str, str], user_name: str):
    return update_password(data, user_name)
