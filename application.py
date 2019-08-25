import os

from flask import Flask
from flask import render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__,static_url_path='')
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channel_set={}

@app.route("/")
def index():
    return render_template("index.html")

@socketio.on("add channel")
def add_channel(data):
    channel_set.add(data)
    print(data)
    emit("add channel",data,broadcast=True)


if __name__ == "__main__":
    app.run(debug=True)
