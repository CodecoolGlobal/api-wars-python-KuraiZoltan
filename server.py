# put your code here
from flask import Flask, render_template

import util

app = Flask(__name__)


@app.route('/')
def index():
    datas = util.table_head
    return render_template('index.html', datas=datas)


@app.route('/api/response')
def response():
    return response

if __name__ == '__main__':
    app.run()