from .Ship import Ship


class Game:
    def __init__(self):

        self.__ships = {}

    def createShip(self, data):
        if data:
            ship = Ship(dict(
                id=data['id'],
                team=data['team'],
                wheel=data['wheel'],
                rope=data['rope'],
                cannon=data['cannon'],
                anchor=data['anchor']
            ))
            self.__ships[data['id']] = ship
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
            team = self.__ships[shipId].get()['team'].getSelf()
            if team:
                for player in team['players']:
                    if player.getSelf()['id'] == userId:
                        team['players'].remove(player)
                        return
        return None, None

    def deletePlayers(self, shipId):
        if shipId:
            team = self.__ships[shipId].get()['team'].getSelf()
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

    def getScene(self):
        self.getShips()

    def move(self, player, data):
        if data and player:
            if data['up']:
                player['coordY'] += 1
            if data['down']:
                player['coordY'] -= 1
            if data['left']:
                player['coordX'] -= 1
            if data['right']:
                player['coordX'] += 1
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


'''
в бд новый кор.(удал.)
матрица для кор.
для кор. оборудовваание брать из бд(min 4)
рандомить место players в кор.
сцену возвращ. (кор.,игроков, оборудование)
движение организовать 
'''