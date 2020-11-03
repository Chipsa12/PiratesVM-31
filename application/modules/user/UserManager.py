import hashlib
import random

from application.modules.BaseManager import BaseManager
from application.modules.user.User import User


class UserManager(BaseManager):
    def __init__(self, db, mediator, sio, MESSAGES):
        super().__init__(db, mediator, sio, MESSAGES)

        self.users = {}

        # регистрируем триггеры
        self.mediator.set(self.TRIGGERS['GET_USER_BY_TOKEN'], self.__getUserByToken)
        self.mediator.set(self.TRIGGERS['GET_USER_BY_ID'], self.__getUserById)
        # регистрируем события
        self.sio.on(self.MESSAGES['USER_LOGIN'], self.auth)
        self.sio.on(self.MESSAGES['USER_AUTOLOGIN'], self.autoLogin)
        self.sio.on(self.MESSAGES['USER_LOGOUT'], self.logout)
        self.sio.on(self.MESSAGES['USER_SIGNUP'], self.registration)
        self.sio.on(self.MESSAGES['USERS_ONLINE'], self.getUsersOnline)
        self.sio.on('disconnect', self.logout)



    def __generateToken(self, login):
        if login:
            randomInt = random.randint(0, 100000)
            return self.__generateHash(login, str(randomInt))

    def __generateHash(self, str1, str2=""):
        if type(str1) == str and type(str2) == str:
            return hashlib.md5((str1 + str2).encode("utf-8")).hexdigest()
        return None

    def __getUserByToken(self, data):
        if 'token' in data:
            for key in self.users:
                user = self.users[key]
                if user.getSelf()['token'] == data['token']:
                    return user.getSelf()
        return None

    def __getUserById(self, data):
        if 'id' in data:
            for key in self.users:
                user = self.users[key]
                if user.getSelf()['id'] == data['id']:
                    return user.getSelf()
        return None

    def __getUserBySid(self, sid=None):
        if sid:
            for key in self.users:
                for user in self.users[key]:
                    if user.getSelf()['sid'] == sid:
                        return user.getSelf()
        return None

    def __getUsersOnline(self):
        users = []
        for key in self.users:
            users.append(self.users[key].get())
        return users

    async def getUsersOnline(self, sid):
        await self.sio.emit(self.MESSAGES['USERS_ONLINE'], self.__getUsersOnline())

    async def registration(self, sid, data):
        name = data['login']
        login = data['login']
        password = data['hash']
        if name and login and password:
            user = self.db.getUserByLogin(login=login)
            if user:
                await self.sio.emit(self.MESSAGES['USER_SIGNUP'], False, room=sid)
                return
            token = self.__generateToken(login)
            self.db.insertUser(name=name, login=login, password=password, token=token)
            userData = self.db.getUserByToken(token)
            userData['sid'] = sid
            self.users[userData['id']] = User(userData)
            await self.sio.emit(self.MESSAGES['USER_SIGNUP'], self.users[userData['id']].getSelf(), room=sid)
            await self.getUsersOnline(sid)
            await self.sio.emit(self.MESSAGES['TEAM_LIST'], self.mediator.get(self.TRIGGERS['TEAM_LIST'], True), room=sid)
            return
        await self.sio.emit(self.MESSAGES['USER_SIGNUP'], False, room=sid)

    async def auth(self, sid, data):
        login = data['login']
        hash = data['hash']
        rnd = data['random']
        if login and hash and rnd:
            hashDB = self.db.getHashByLogin(login=login)
            if self.__generateHash(hashDB, str(rnd)) == hash:
                token = self.__generateToken(login)
                self.db.updateTokenByLogin(login, token)
                userData = self.db.getUserByToken(token)
                userData['sid'] = sid
                self.users[userData['id']] = User(userData)
                # добавляем пользователя в список пользователей онлайн
                await self.sio.emit(self.MESSAGES['USER_LOGIN'], self.users[userData['id']].getSelf(), room=sid)
                await self.getUsersOnline(sid)
                # отправить пользователю список команд
                await self.sio.emit(self.MESSAGES['TEAM_LIST'], self.mediator.get(self.TRIGGERS['TEAM_LIST'], True), room=sid)
                return
        await self.sio.emit(self.MESSAGES['USER_LOGIN'], False, room=sid)

    async def logout(self, sid, data):
        # user = None
        # если токен, то взять юзера по токену (из self.users)
        if 'token' in data:
            user = self.__getUserByToken(data)
        # иначе взять по sid (из self.users)
        else:
            user = self.__getUserBySid(sid=sid)
        if user:  # is not None:
            # бросить событие, что пользователь мухожук
            self.mediator.call(self.EVENTS['USER_LOGOUT'], dict(sid=sid, token=user['token']))
            # удалить пользователя из self.users
            del self.users[user['id']]
            # перезаписать токен в БД
            self.db.updateUserTokenById(id=user['id'], token='')
            # ответить пользователю о результатах его логаута
            await self.sio.emit(self.MESSAGES['USER_LOGOUT'], True, room=sid)
            await self.getUsersOnline(sid)
            return
        await self.sio.emit(self.MESSAGES['USER_LOGOUT'], False, room=sid)

    async def autoLogin(self, sid, data):
        if 'token' in data:
            user = self.db.getUserByToken(data['token'])
            if user:
                token = self.__generateToken(user['login'])
                self.db.updateUserTokenById(id=user['id'], token=token)
                user['sid'] = sid
                user['token'] = token
                self.users.update({user['id']: User(user)})
                await self.sio.emit(self.MESSAGES['USER_AUTOLOGIN'], dict(token=token), room=sid)
                await self.getUsersOnline(sid)
                await self.sio.emit(self.MESSAGES['TEAM_LIST'], self.mediator.get(self.TRIGGERS['TEAM_LIST'], True),
                                    room=sid)
                return
        await self.sio.emit(self.MESSAGES['USER_AUTOLOGIN'], False, room=sid)
