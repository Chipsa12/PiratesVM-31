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
            return self.__ships
        return None

    def deleteShip(self, data):
        if data:
            for key in self.__ships:
                if key == data['id']:
                    del self.__ships[key]
                    return True
        return None

    def getShip(self, data):
        if data:
            for key in self.__ships:
                team = self.__ships[key]['team'].getSelf()
                for player in team['players']:
                    if player.getSelf()['id'] == data['id']:
                        return self.__ships[key]
        return None

    def deletePlayer(self, data):
        if data:
            team = self.__ships[data['shipId']].get()['team'].getSelf()
            if team:
                for player in team['players']:
                    if player.getSelf()['id'] == data['playerId']:
                        team['players'].remove(player)
                        return player
        return None, None
