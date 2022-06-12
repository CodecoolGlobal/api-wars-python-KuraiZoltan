import database_common


@database_common.connection_handler
def add_new_user(cursor, username, password):
    query = "INSERT INTO users " \
            "VALUES (DEFAULT, %(username)s, %(password)s)"
    cursor.execute(query,
                   {'username': username, 'password': password})


@database_common.connection_handler
def get_user_by_detail(cursor, user_login):
    username = user_login
    query = "SELECT * FROM users WHERE username = %(username)s"
    cursor.execute(query, {'username': username})
    return cursor.fetchone()
