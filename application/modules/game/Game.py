from random import randint

from .Ship import Ship


class Game:
    def __init__(self):

        self.__ships = {}
        self.__mapShip = [
            [0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 1, 1, 2, 0, 0, 0, 0],
            [0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0],
            [0, 0, 2, 1, 1, 1, 1, 1, 1, 2, 0, 0],
            [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
            [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
            [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
            [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0]
        ]
        self.__mapGame = []

    def __randomCoord(self, furnitures):
        while True:
            coordX = randint(0, len(self.__mapShip) - 1)
            coordY = randint(0, len(self.__mapShip[coordX]) - 1)
            for furniture in furnitures:
                if (coordX != furniture.get()['coordX']) and \
                   (coordY != furniture.get()['coordY']) and \
                   (self.__mapShip[coordX][coordY] == 1):
                    check = True
                else:
                    check = False
            if check:
                break
        return coordX, coordY

    def createShip(self, data):
        if data:
            ship = Ship(dict(
                        id=data['id'],
                        team=self.getCoordPlayer(data['team']),
                        furniture=self.getCoordFurniture(furnitures=data['furniture'])
            ))
            self.__ships[data['id']] = ship
            self.__mapGame.append(ship)
            return ship
        return None

    def deleteShip(self, shipId):
        if shipId:
            for key in self.__ships:
                if key == shipId:
                    del self.__ships[key]
                    return True
        return None

    def getShipByUserId(self, userId):
        if userId:
            for key in self.__ships:
                team = self.__ships[key]['team'].getSelf()
                for player in team['players']:
                    if player.getSelf()['id'] == userId:
                        return self.__ships[key]
        return None

    def deletePlayer(self, userId, shipId):
        if userId and shipId:
            team = self.__ships[shipId].getSelf()['team'].getSelf()
            if team:
                for player in team['players']:
                    if player.getSelf()['id'] == userId:
                        team['players'].remove(player)
                        return
        return None, None

    def deletePlayers(self, shipId):
        if shipId:
            team = self.__ships[shipId].getSelf()['team'].getSelf()
            if team:
                for player in team['players']:
                    team['players'].remove(player)
                return True
        return None, None

    def getShips(self):
        ships = []
        for key in self.__ships:
            ships.append(self.__ships[key].get())
        return ships

    def getScene(self, shipId):
        ship = self.__ships[shipId].get()
        if ship:
            return dict(mapGame=self.__mapGame, ship=ship)
        return False

    def move(self, player, data):
        if data and player:
            if data['up'] and self.__mapShip[player['coordX']][player['coordY'] + 1] == 1:
                    player['coordY'] += 1
            if data['down'] and self.__mapShip[player['coordX']][player['coordY'] - 1] == 1:
                    player['coordY'] -= 1
            if data['left'] and self.__mapShip[player['coordX'] - 1][player['coordY']] == 1:
                    player['coordX'] -= 1
            if data['right'] and self.__mapShip[player['coordX'] + 1][player['coordY']] == 1:
                    player['coordX'] += 1
            if data['up-left'] and self.__mapShip[player['coordX'] - 1][player['coordY'] + 1] == 1:
                    player['coordY'] += 1
                    player['coordx'] -= 1
            if data['up-right'] and self.__mapShip[player['coordX'] + 1][player['coordY'] + 1] == 1:
                    player['coordY'] += 1
                    player['coordx'] += 1
            if data['down-left'] and self.__mapShip[player['coordX'] - 1][player['coordY'] - 1] == 1:
                    player['coordY'] -= 1
                    player['coordx'] -= 1
            if data['down-right'] and self.__mapShip[player['coordX'] + 1][player['coordY'] - 1] == 1:
                    player['coordY'] -= 1
                    player['coordx'] += 1
            return player
        return False

    def getPlayerByUserId(self, userId):
        if userId:
            for key in self.__ships:
                team = self.__ships[key]['team'].getSelf()
                for player in team['players']:
                    if player.getSelf()['id'] == userId:
                        return player.getSelf()
                    return None
        return None

    def getCoordFurniture(self, furnitures):
        # Рандомить место в зависимости от предмета
        for furniture in furnitures:
            if furniture.get()['name'] == 'wheel':
                while True:
                    coordX = round(((len(self.__mapShip) - 1) / 4) * 3)
                    coordY = randint(2, len(self.__mapShip[coordX]) - 3)
                    if self.__mapShip[coordX][coordY] == 1:
                        furniture.get()['coordX'] = coordX
                        furniture.get()['coordY'] = coordY
                        break
            if furniture.get()['name'] == 'anchor':
                while True:
                    coordX = randint(0, len(self.__mapShip) - 1)
                    coordY = randint(0, len(self.__mapShip[coordX]) - 1)
                    if self.__mapShip[coordX][coordY] == 2:
                        furniture.get()['coordX'] = coordX
                        furniture.get()['coordY'] = coordY
                        break
            if furniture.get()['name'] == 'cannon':
                while True:
                    coordX = randint(0, len(self.__mapShip) - 1)
                    if (self.__mapShip[coordX][0] and self.__mapShip[coordX][len(self.__mapShip[coordX]) - 1]) == 2:
                        side = randint(0, 1)
                        coordY = 1 if side == 0 else (len(self.__mapShip[coordX]) - 2)
                        if self.__mapShip[coordX][coordY] == 1:
                            furniture.get()['coordX'] = coordX
                            furniture.get()['coordY'] = coordY
                            break
            if furniture.get()['name'] == 'rope':
                coordX = randint(0, round((len(self.__mapShip) - 1) / 3))
                coordY = randint(0, len(self.__mapShip[coordX]) - 1)
                if self.__mapShip[coordX][coordY] == 1:
                    furniture.get()['coordX'] = coordX
                    furniture.get()['coordY'] = coordY
                    break
        return furnitures


    def getCoordPlayer(self, team, furnitures):
        for players in team.getSelf():
            for player in players:
                coordX, coordY = self.__randomCoord(furnitures)
                player.getSelf()['coordX'] = coordX
                player.getSelf()['coordY'] = coordY
        return team
