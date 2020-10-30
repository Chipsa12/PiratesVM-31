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

    # отпрваить сообщение
    async def sendMessageInRoom(self, sid, data):
        user = self.mediator.get(self.TRIGGERS['GET_USER_BY_TOKEN'], data)
        roomId = self.mediator.get(self.TRIGGERS['GET_ROOM_ID'], data)
        if user and roomId:
            message = Message(dict(name=user['name'],
                                          message=data['message'],
                                          room=roomId,))
            self.db.insertMessage(message.getSelf())
            await self.sio.emit(self.MESSAGES['SEND_MESSAGE_IN_ROOM'], message.get(), room=roomId)
        await self.sio.emit(self.MESSAGES['SEND_MESSAGE_IN_ROOM'], False, room=sid)

    async def sendMessage(self, sid, data):
        user = self.mediator.get(self.TRIGGERS['GET_USER_BY_TOKEN'], data)
        if user:
            message = Message(dict(name=user['name'],
                                          message=data['message']))
            await self.sio.emit(self.MESSAGES['SEND_MESSAGE'], message.get())
            return 
        await self.sio.emit(self.MESSAGES['SEND_MESSAGE'], False, room=sid)

    # отправить сообщение в echoChat
    '''async def sendMessageToEchoChat(self, sid, data):
        room = self.__CHAT['ROOMS']['ECHO']
        senderToken = data['token']
        senderCoord = None
        # по нашему token находим наши координаты
        for userCoord in self.usersCoord:
            if userCoord['token'] == senderToken:
                senderCoord = userCoord['point']
                break
        # подписываем пользователей находящихся на определённом расстоянии
        for userCoord in self.usersCoord:
            # Измеряем расстояние между двумя игроками
            distance = self.mediator.get(
                self.TRIGGERS['COUNT_DISTANCE'],
                dict(point1=senderCoord, point2=userCoord['point'])
            )
            if distance <= self.__CHAT['ECHO_DISTANCE']:
                for userSid in self.__usersSid:
                    if userSid['token'] == userCoord['token']:
                        self.subscribeRoom(userSid['sid'], room)
        # отправляем сообщение всем в комнате
        await self.sio.emit('sendMessage', data, room)
        # удаляем всех подписчиков из комнаты
        for user in self.__usersSid:
            self.unsubscribeRoom(user['sid'], room)'''
