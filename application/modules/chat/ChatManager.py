from application.modules.BaseManager import BaseManager
from .Message import Message
from time import strftime,  localtime

class ChatManager(BaseManager):
    def __init__(self, db, mediator, sio, MESSAGES, CHAT):
        super().__init__(db, mediator, sio, MESSAGES)
        self.__CHAT = CHAT
        # TODO
        # 1. ПРИДУМАТЬ ГДЕ ХРАНИТЬ КООРДИНАТЫ ЮЗЕРОВ!!!
        # (Когда измените место хранения коородинат исправте метод sendMessageToEchoChat)

        # В массиве usersCoord должны храняться словари dict(token=token, point=Point(x, y))
        self.usersCoord = []

        # self.mediator.subscribe(self.EVENTS['ADD_USER_ONLINE'], self.addUserOnline)
        # self.mediator.subscribe(self.EVENTS['DELETE_USER_ONLINE'], self.deleteUserOnline)
        #
        # self.mediator.set(self.TRIGGERS['GET_TOKEN_BY_SID'], self.getTokenBySid)
        # self.mediator.set(self.TRIGGERS['GET_SID_BY_TOKEN'], self.getSidByToken)

        @sio.event
        def connect(sid, environ):
            self.__sid = sid
            print('connect ', sid)

        @sio.event
        def disconnect(sid):
            print('disconnect ', sid)

        self.sio.on(self.MESSAGES['SEND_MESSAGE_IN_ROOM'], self.sendMessageInRoom)
        self.sio.on(self.MESSAGES['SEND_MESSAGE'], self.sendMessage)


    # сохранить сообщение в базу данных
    def __saveMessage(self, data):
        if 'message' in data and 'token' in data:
            user = self.mediator.get(
                self.TRIGGERS['GET_USER_BY_TOKEN'],
                dict(token=data['token'])
            )
            if user:
                room = ('room' in data and data['room']) or 'common'
                self.db.insertMessage(data['message'], user['id'], room)
        return None

    # отпрваить сообщение
    async def sendMessageInRoom(self, sid, data):
        user = self.mediator.get(self.TRIGGERS['GET_USER_BY_TOKEN'], data)
        roomId = self.mediator.get(self.TRIGGERS['GET_ROOM_ID'], user['id'])
        if user and roomId:
            message = Message(dict( userId=user['id'],
                                    name=user['name'],
                                    message=data['message'],
                                    roomId=roomId,))
            self.db.insertMessage(message.getSelf())
            await self.sio.emit(self.MESSAGES['SEND_MESSAGE_IN_ROOM'], message.get(), room=roomId)
            return
        await self.sio.emit(self.MESSAGES['SEND_MESSAGE_IN_ROOM'], False, room=sid)

    async def sendMessage(self, sid, data):
        user = self.mediator.get(self.TRIGGERS['GET_USER_BY_TOKEN'], data)
        if user:
            message = Message(dict( userId=user['id'],
                                    name=user['name'],
                                    message=data['message']))
            self.db.insertMessage(message.getSelf())
            await self.sio.emit(self.MESSAGES['SEND_MESSAGE'], message.get())
            return 
        await self.sio.emit(self.MESSAGES['SEND_MESSAGE'], False, room=sid)
