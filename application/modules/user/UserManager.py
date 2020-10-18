import hashlib
import random

from application.modules.BaseManager import BaseManager


class UserManager(BaseManager):
    def __init__(self, db, mediator, sio, MESSAGES):
        super().__init__(db, mediator, sio, MESSAGES)
        # регистрируем триггеры
        self.mediator.set(self.TRIGGERS['GET_USER_BY_TOKEN'], self.__getUserByToken)
        self.mediator.set(self.TRIGGERS['GET_USER_BY_LOGIN'], self.__getUserByLogin)
        self.mediator.set(self.TRIGGERS['GET_HASH_BY_LOGIN'], self.__getHashByLogin)
        # регистрируем события
        self.mediator.subscribe(self.EVENTS['INSERT_USER'], self.__insertUser)
        self.mediator.subscribe(self.EVENTS['UPDATE_TOKEN_BY_LOGIN'], self.__updateTokenByLogin)
        self.sio.on(self.MESSAGES['USER_LOGIN'], self.auth)
        self.sio.on(self.MESSAGES['USER_LOGOUT'], self.logout)
        self.sio.on(self.MESSAGES['USER_SIGNUP'], self.registration)

    def __generateToken(self, login):
        if login:
            randomInt = random.randint(0, 100000)
            return self.__generateHash(login, str(randomInt))

    def __generateHash(self, str1, str2=""):
        if type(str1) == str and type(str2) == str:
            return hashlib.md5((str1 + str2).encode("utf-8")).hexdigest()
        return None

    def __getUserByToken(self, data=None):
        if data:
            return self.db.getUserByToken(data['token'])
        return None

    def __getUserByLogin(self, data):
        if data:
            return self.db.getUserByLogin(data['login'])
        return None

    def __getHashByLogin(self, data):
        if data:
            return self.db.getHashByLogin(data['login'])
        return None

    def __insertUser(self, data):
        if data:
            return self.db.insertUser(data['name'], data['login'], data['password'], data['token'])
        return None

    def __updateTokenByLogin(self, data):
        if data:
            return self.db.updateTokenByLogin(data['login'], data['token'])
        return None

    async def registration(self, sio, data):
        name = data['login']
        login = data['login']
        password = data['hash']
        user = self.mediator.get(self.TRIGGERS['GET_USER_BY_LOGIN'], dict(login=login))
        if user or not name or not login or not password:
            return None
        else:
            token = self.__generateToken(login)
            self.mediator.call(self.EVENTS['INSERT_USER'], dict(name=name, login=login, password=password, token=token))
            await self.sio.emit(self.MESSAGES['USER_SIGNUP'], dict(token=token), room=sio)
            return True

    async def auth(self, sio, data):
        login = data['login']
        hash = data['hash']
        rnd = data['random']
        if login and hash and rnd:
            hashDB = self.mediator.get(self.TRIGGERS['GET_HASH_BY_LOGIN'], dict(login=login))
            if self.__generateHash(hashDB, str(rnd)) == hash:
                token = self.__generateToken(login)
                self.mediator.call(self.EVENTS['UPDATE_TOKEN_BY_LOGIN'], dict(login=login, token=token))
                # добавляем пользователя в список пользователей онлайн
                self.mediator.call(self.EVENTS['ADD_USER_ONLINE'], dict(token=token, sid=sio, coord=None))
                await self.sio.emit(self.MESSAGES['USER_LOGIN'], dict(token=token), room=sio)
                return True
        return False

    def logout(self, sio, data):
        token = data['token']
        user = self.mediator.get(self.TRIGGERS['GET_USER_BY_TOKEN'],  dict(token=token))
        # удаляем пользователя из списка пользователей онлайн
        self.mediator.call(self.EVENTS['DELETE_USER_ONLINE'], dict(token=token))
        token = 'NULL'
        if user:
            self.mediator.call(self.EVENTS['UPDATE_TOKEN_BY_LOGIN'], dict(login=user['login'], token=token))
            return True
        return False
