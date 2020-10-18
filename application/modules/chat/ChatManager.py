from application.modules.BaseManager import BaseManager


class ChatManager(BaseManager):
    def __init__(self, db, mediator, sio, MESSAGES, CHAT):
        super().__init__(db, mediator, sio, MESSAGES)
        self.__CHAT = CHAT
        # массив из словарей dict(token=token, sid=sid)
        self.__usersSid = {}
        self.__sid = ''
        # TODO
        # 1. ПРИДУМАТЬ ГДЕ ХРАНИТЬ КООРДИНАТЫ ЮЗЕРОВ!!!
        # (Когда измените место хранения коородинат исправте метод sendMessageToEchoChat)

        # В массиве usersCoord должны храняться словари dict(token=token, point=Point(x, y))
        self.usersCoord = []

        self.mediator.subscribe(self.EVENTS['ADD_USER_ONLINE'], self.addUserOnline)
        self.mediator.subscribe(self.EVENTS['DELETE_USER_ONLINE'], self.deleteUserOnline)

        self.mediator.set(self.TRIGGERS['GET_TOKEN_BY_SID'], self.getTokenBySid)

        @sio.event
        def connect(sid, environ):
            self.__sid = sid
            print('connect ', sid)

        @sio.event
        def disconnect(sid):
            print('disconnect ', sid)

        @sio.on(self.MESSAGES['SEND_MESSAGE'])
        async def onSendMessage(sid, data):
            if 'token' in data:
                await self.sendMessage(sid, data)

        @sio.on(self.MESSAGES['SUBSCRIBE_ROOM'])
        def onSubscribeRoom(sid, data):
            if 'token' in data and 'room' in data:
                self.subscribeRoom(sid, data['room'])

        @sio.on(self.MESSAGES['UNSUBSCRIBE_ROOM'])
        def onUnsubscribeRoom(sid, data):
            if 'token' in data and 'room' in data:
                self.unsubscribeRoom(sid, data['room'])

    def getTokenBySid(self, data):
        for token, value in self.__usersSid.items():
            if value == data['sid']:
                return token
        return None

    # отпрваить сообщение
    async def sendMessage(self, sid, data):
        user = self.mediator.get(self.TRIGGERS['GET_USER_BY_TOKEN'], data)
        if 'room' in data and data['room'] == self.__CHAT['ROOMS']['ECHO']:
            await self.sendMessageToEchoChat(sid, data)
        elif 'room' in data:
            await self.sio.emit(self.MESSAGES['SEND_MESSAGE'], data, data['room'])
        else:
            await self.sio.emit(self.MESSAGES['SEND_MESSAGE'], dict(name=user['name'], message=data['message']))
        # сохранить сообщение в бд
        self.saveMessage(data)

    # отправить сообщение в echoChat
    async def sendMessageToEchoChat(self, sid, data):
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
            self.unsubscribeRoom(user['sid'], room)

    # подписаться на комнату
    def subscribeRoom(self, sid, room):
        self.sio.enter_room(sid, room)

    # отписаться от комнаты
    def unsubscribeRoom(self, sid, room):
        self.sio.leave_room(sid, room)

    # сохранить сообщение в базу данных
    def saveMessage(self, data):
        if 'message' in data and 'token' in data:
            user = self.mediator.get(
                self.TRIGGERS['GET_USER_BY_TOKEN'],
                dict(token=data['token'])
            )
            if user:
                room = ('room' in data and data['room']) or 'common'
                self.db.insertMessage(data['message'], user['id'], room)

    # добавить пользователя в список подключённых
    def addUserOnline(self, data):
        token, sid, coord = data.values()
        if token and sid and coord:
            self.__usersSid[token] = dict(sid=sid, coord=coord)
            print(self.__usersSid)

    # удалить пользователя из списка подключённых
    def deleteUserOnline(self, data):
        token = data['token']
        if token:
            for key in self.__usersSid:
                if key == token:
                    del self.__usersSid[token]
