class Socket:
    def __init__(self, sio, mediator):
        @sio.event
        def connect(sid, environ):
            print('connect', sid)

        @sio.event
        def disconnect(sid):
            print('disconnect', sid)
