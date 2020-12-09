from ..BaseManager import BaseManager
from .Game import Game


class GameManager(BaseManager):
    def __init__(self, db, mediator, sio, MESSAGES):
        super().__init__(db=db, mediator=mediator, sio=sio, MESSAGES=MESSAGES)
        self.__Game = Game()

        self.mediator.subscribe(self.EVENTS['USER_LOGOUT'], self.__disconnect)
        self.mediator.subscribe(self.EVENTS['START_GAME'], self.startGame)

        self.sio.on(self.MESSAGES['END_GAME'], self.endGame)
        self.sio.on(self.MESSAGES['MOVE'], self.move)

    async def __disconnect(self, data):
        await self.__leaveShip(data['sid'], data)

    async def __leaveShip(self, sid, data):
        user = self.mediator.get(self.TRIGGERS['GET_USER_BY_TOKEN'], data)
        if user:
            ship = self.__Game.getShipByUserId(userId=user['id'])
            if ship:
                self.__Game.deletePlayer(shipId=ship.get()['id'], userId=user['id'])
                await self.sio.emit(self.MESSAGES['LEAVE_SHIP'], user, room=ship.get()['id'])
                return
        await self.sio.emit(self.MESSAGES['LEAVE_SHIP'], False, room=sid)
        return

    def __checkIsEndGame(self):
        ships = self.__Game.getShips()
        deathShips = []
        if ships:
            for ship in ships:
                if ship['health'] <= 0:
                    deathShips.append(ship)
                else:
                    return False
            return deathShips
        return False

    async def startGame(self, sid,  data):
        if data:
            user = data['owner']
            if user:
                wheel = self.db.getFurnitureByName('wheel')
                rope = self.db.getFurnitureByName('rope')
                cannon = self.db.getFurnitureByName('cannon')
                anchor = self.db.getFurnitureByName('anchor')
                ship = self.__Game.createShip(dict(id=user['id'],
                                                   team=data['team'],
                                                   furniture=[
                                                                wheel,
                                                                rope,
                                                                cannon,
                                                                anchor
                                                            ]
                                                   ))
                if ship:
                    await self.sio.emit(self.MESSAGES['START_GAME'], ship.get(), room=data['team']['roomId'])
                    return True
        await self.sio.emit(self.MESSAGES['START_GAME'], False, room=data['sid'])
        return False

    async def endGame(self, sid, data):
        # написать функцию которая проверяла бы состояние игры
        # передавать флаг о том что игра закончена
        # Если флаг True Удалить всех игроков из команды
        # И посудину
        # Иначе если флаг False игра продолжается
        deathShips = self.__checkIsEndGame()
        if data and deathShips:
            for ship in deathShips:
                await self.sio.emit(self.MESSAGES['END_GAME'], True, room=ship['id'])
                self.mediator.get(self.TRIGGERS['REMOVE_TEAM'], ship['team'])
                self.__Game.deleteShip(shipId=ship['id'])
                await self.sio.emit(self.MESSAGES['TEAM_LIST'], self.mediator.get(self.TRIGGERS['TEAM_LIST'], True))
            return
        return False

    async def move(self, sid, data):
        if data:
            user = self.mediator.get(self.TRIGGERS['GET_USER_BY_TOKEN'], data)
            player = self.__Game.getPlayerByUserId(user['id'])
            if player:
                self.__Game.move(player, data)
                await self.sio.emit(self.MESSAGES['MOVE'], self.__Game.getScene())
                return True
            await self.sio.emit(self.MESSAGES['MOVE'], False, room=sid)
            return False
        await self.sio.emit(self.MESSAGES['MOVE'], False, room=sid)
        return False
