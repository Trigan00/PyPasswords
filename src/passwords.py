import secrets
import string
import json
from src.encryption import encrypt, decrypt


def gen_password() -> str:
    alphabet = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(secrets.choice(alphabet) for _ in range(15))
    return password


def add_new_pass(data: dict[str, str], user_name: str) -> bool:
    title, login, password, url, secret = data.values()
    encrypted_pas = encrypt(password, secret)

    try:
        with open(user_name + "_passwords.json", 'r') as f:
            user_passwords = json.load(f)
    except FileNotFoundError:
        user_passwords = []

    user_passwords.append({
        "id": len(user_passwords),
        "title": title,
        "login": login,
        "password": encrypted_pas,
        "url": url
    })

    with open(user_name + "_passwords.json", 'w') as f:
        json.dump(user_passwords, f, indent=4)

    return True


def get_all_passwords(user_name: str) -> list:
    try:
        with open(user_name + "_passwords.json", 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []


def delete_password(user_name: str, el_id: int) -> str:
    try:
        with open(user_name + "_passwords.json", 'r') as f:
            data = json.load(f)

        for item in data:
            if item['id'] == el_id:
                data.remove(item)

        with open(user_name + "_passwords.json", 'w') as f:
            json.dump(data, f)
        return "Password was successfully deleted"
    except FileNotFoundError:
        raise FileNotFoundError("File not found")


def decrypt_password(user_name: str, el_id: int, secret: str) -> dict[str: str]:
    try:
        with open(user_name + "_passwords.json", 'r') as f:
            user_passwords = json.load(f)
    except FileNotFoundError:
        user_passwords = []

    password_data = next((item for item in user_passwords if item["id"] == el_id), None)
    if not password_data:
        raise Exception("Password not found")

    decrypted_pas = decrypt(password_data["password"], secret)

    data = password_data.copy()
    data["password"] = decrypted_pas

    return data


def update_password(data: dict[str, str], user_name: str) -> str:
    try:
        with open(user_name + "_passwords.json", 'r') as f:
            user_passwords = json.load(f)
    except FileNotFoundError:
        user_passwords = []

    password_data = next((item for item in user_passwords if item["id"] == data["id"]), None)
    if not password_data:
        raise Exception("Password not found")

    pass_index = password_data["id"]

    user_passwords[pass_index]["title"] = data["title"]
    user_passwords[pass_index]["login"] = data["login"]
    user_passwords[pass_index]["password"] = encrypt(data["password"], data["secret"])
    user_passwords[pass_index]["url"] = data["url"]

    with open(user_name + "_passwords.json", 'w') as f:
        json.dump(user_passwords, f, indent=4)

    return "Password was successfully updated"
