from web_socket_server import WebSocketServer, socketio, app

app = WebSocketServer().create_app()

@socketio.on('connect')
def handle_connect():
    try:
        print('Client connected')
    except Exception as e:
        print(f"An error as occurred: {e}")

@socketio.on('disconnect')
def handle_disconnect():
    print("Client disconnect")

@socketio.on('message') 
def handle_message(message): 
    try: 
        print(f'Recieved message: {message}')
        socketio.emit('message', message) 
    except Exception as e:
        print(f"An error has occurred: {e}")

@socketio.on('signin')
def handle_signin():
    try:
        print("User signed in")
    except Exception as e:
        print(f"An error has occurred: {e}")

@socketio.on('signout')
def handle_signout():
    print("User Signed out")

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0, port=5000')