import json
import os.path
import bcrypt
import hashlib

USERS_PATH = 'users.json'


def get_all() -> list:
    if not (os.path.isfile(USERS_PATH)):
        return []
    users_file = open(USERS_PATH, 'r')
    users = json.load(users_file)
    users_file.close()
    if len(users):
        return users
    return []


def add_new_user(name: str, password: str, img: str) -> bool:
    try:
        with open(USERS_PATH, 'r') as f:
            users = json.load(f)
    except FileNotFoundError:
        users = []

    for user in users:
        if user["name"] == name:
            raise Exception("User with this name already exists")

    hashed = bcrypt.hashpw(bytes(password, 'utf-8'), bcrypt.gensalt())
    new_user = {'name': name, "password": hashed.decode('utf-8'), "image": img}
    users.append(new_user)

    with open('users.json', 'w') as f:
        json.dump(users, f, indent=4)

    return True


def login(name: str, password: str) -> dict[str, str]:
    try:
        with open(USERS_PATH, 'r') as f:
            users = json.load(f)
    except FileNotFoundError:
        raise FileNotFoundError('File not found')

    for user in users:
        if user["name"] == name:
            if bcrypt.checkpw(bytes(password, 'utf-8'), bytes(user["password"], 'utf-8')):
                return {"name": name, "secret": hashlib.sha256(password.encode("utf-8")).hexdigest()}
            raise Exception("Password does not Match")
    raise Exception("User not found")
