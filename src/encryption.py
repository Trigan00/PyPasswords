import base64
# from Crypto import Random
from Crypto.Cipher import AES

# iv = Random.new().read(AES.block_size)
iv = b'\xd0\xf1\xc6D\xfa\xc0\x16\x169Xm\xc2\x9d\xb8\x1fM'


def encrypt(message, key):
    key = key[:16].encode("utf-8")
    obj = AES.new(key, AES.MODE_CFB, iv)
    bytes_message = base64.urlsafe_b64encode(obj.encrypt(message.encode("utf-8")))
    return bytes_message.decode("utf-8")


def decrypt(cipher, key):
    key = key[:16].encode("utf-8")
    obj2 = AES.new(key, AES.MODE_CFB, iv)
    bytes_message = obj2.decrypt(base64.urlsafe_b64decode(cipher))
    return bytes_message.decode("utf-8")
