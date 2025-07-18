from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

socketio = SocketIO()
app = Flask(__name__)
CORS(app)

class WebSocketServer: 
    def __init__(self, debug=False):
        self.create_app(debug)
    
    def create_app(self, debug=False):

        app.debug = debug
        socketio.init_app(app, cors_allowed_origins="*")
        return app