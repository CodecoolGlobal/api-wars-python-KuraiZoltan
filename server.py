# put your code here
from flask import Flask, render_template, request, redirect, url_for, flash, session
import data_manager
import util


app = Flask(__name__)
app.secret_key = util.generate_random_secret_key()


@app.route('/')
def index():
    datas = util.table_head
    popup = util.popup_content
    return render_template('index.html', datas=datas, popup=popup)


@app.route('/user_registration', methods=['GET', 'POST'])
def user_registration():
    if request.method == 'POST':
        is_verified, user, flash_massage = util.verify_registration_details(request.form)
        if is_verified:
            username, password = user
            data_manager.add_new_user(username, password)
            return redirect(url_for('user_log_in'))
        else:
            return redirect(url_for('user_registration'))
    return render_template('user_registration.html')


@app.route('/login', methods=['GET', 'POST'])
def user_log_in():
    if request.method == 'POST':
        is_verified, username, flash_message = util.verify_log_in_details(request.form)
        if is_verified:
            session['username'] = username
            return redirect(url_for('index'))
        else:
            return redirect(url_for('user_log_in'))
    return render_template('login.html')


@app.route('/logout')
def user_log_out():
    session.pop('username', None)
    return redirect(url_for('index'))


@app.route('/api/response')
def response():
    return response


if __name__ == '__main__':
    app.run()
