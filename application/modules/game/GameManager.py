from ..BaseManager import BaseManager
from .Game import Game

class GameManager(BaseManager):
    def __init__(self, db, mediator, sio, MESSAGES):
        super().__init__(db=db, mediator=mediator, sio=sio, MESSAGES=MESSAGES)
        self.__Game = Game()

        self.mediator.subscribe(self.EVENTS['USER_LOGOUT'], self.__disconect)

    async def __disconect(self, sid, data):
        user = self.mediator.get(self.TRIGGERS['GET_USER_BY_TOKEN'], data)
        if user:
            ship = self.__Game.getShipByUserId(user['id'])
            if ship:
                self.__Game.deletePlayer(dict(shipId=ship.get()['id'], userId=user['id']))
                await self.sio.emit(self.MESSAGES['LEAVE_SHIP'], True, room=ship.get()['id'])
        await self.sio.emit(self.MESSAGES['LEAVE_SHIP'], False, room=sid)

    def startGame(self):
        return



    def endGame(self):
        return