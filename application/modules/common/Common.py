import string
from random import sample

class Common:

    def generatePasswordForLobby(self):
        symbols = string.ascii_uppercase
        passwordTeam = ''.join(sample(symbols, 7))
        return passwordTeam

    def getRoomId(self):
        symbols = string.ascii_uppercase + string.ascii_letters + string.digits
        roomId = ''.join(sample(symbols, 6))
        return roomId
