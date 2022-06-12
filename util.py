import string

import bcrypt
import data_manager
import random

table_head = ['Name', 'Diameter', 'Climate', 'Terrain', 'Surface Water Percentage', 'Population', 'Residents']
popup_content = ['Name', 'Height', 'Mass', 'Hair color', 'Skin color', 'Eye color', 'Birth year', 'Gender']

def generate_random_secret_key():
    secret_key = random.choices(string.ascii_lowercase, k=4)
    secret_key.extend(random.choices(string.ascii_uppercase, k=4))
    secret_key.extend(random.choices(string.digits, k=4))
    secret_key.extend(random.choices(string.punctuation, k=4))
    random.shuffle(secret_key)
    return secret_key


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_password.encode('utf-8'))


def verify_registration_details(user_details):
    username, password, password_check = user_details.values()
    user = data_manager.get_user_by_detail(username)
    if password == password_check:
        if user is None:
            password = hash_password(password)
            return True, (username, password), 'Signed up successfully!'
        elif username == user['username']:
            return False, None, 'Username already in use. Please, try again!'
    else:
        return False, None, 'Password do not match. PLease, try again!'


def verify_log_in_details(log_in_form):
    username, password = log_in_form.values()
    user = data_manager.get_user_by_detail(username)
    if user is not None and verify_password(password, user['password']):
        return True, user['username'], 'Logged in successfully!'
    else:
        return False, None, 'Password do not match!'
