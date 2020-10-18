from application.modules.BaseManager import BaseManager
from application.modules.lobby.Player import Player
#генерация пароля для лобби и roomId
from application.modules.common.Common import Common


class LobbyManager(BaseManager):
    def __init__(self, mediator, sio, MESSAGES):
        super().__init__(mediator=mediator, sio=sio, MESSAGES=MESSAGES)

        # __teams = {
        #             'teamId': {passwordTeam, players=[user1, user2, ...], roomId},
        #             'teamId': passwordTeam, players=[user1, user2, ...], roomId
        #         }
        # teamId == creatorToken
        # user = {
        #   token: '',
        #   sio: '',
        #   readyToStart: False
        # }

        self.__teams = {}

        self.sio.on(self.MESSAGES['CREATE_TEAM'], self.createTeam)
        #self.sio.on(self.MESSAGES['READY_TO_START'], self.readyToStart)

    '''def __findUserInTeams(self, token):
        for teamKey in self.__teams:
            for user in self.__teams[teamKey]:
                if user['token'] == token:
                    return user, teamKey
        return None, None

    def __checkTeamIsReady(self, teamId):
        for user in self.__teams[teamId]:
            if not user['readyToStart']:
                return False
        return True'''

    def __deleteEmptyTeams(self):
        for teamId in self.__teams:
            if len(self.__teams[teamId]['players']) == 0:
                del self.__teams[teamId]

    def __deleteFromTeam(self, userToken, teamId):
        users = self.__teams[teamId]['players']
        for user in users:
            if user.token == userToken:
                self.__teams[teamId]['players'].remove(user)
                return

    def __deleteUserFromAllTeams(self, user, sid):
        for teamId in self.__teams:
            for users in self.__teams[teamId]['players']:
                if users.token == user['token']:
                    self.sio.leave_room(sid, self.__teams[teamId]['roomId'])
                    if user['token'] == self.__teams[teamId]:
                        del self.__teams[teamId]
                    self.__deleteFromTeam(users.token, teamId)
                    continue
        self.__deleteEmptyTeams()

    '''async def readyToStart(self, sid, data):
        user, teamId = self.__findUserInTeams(data['token'])
        if user:
            user['readyToStart'] = True
        if teamId and self.__checkTeamIsReady(teamId):
            for user in self.__teams[teamId]:
                await self.sio.emit(self.MESSAGES['READY_TO_START'], {}, user['sid'])'''

    async def createTeam(self, sid, data):
        user = self.mediator.get(self.TRIGGERS['GET_USER_BY_TOKEN'], data) #создатель (data=token пока)
        if user:
            for teamId in self.__teams:
                if user['token'] == teamId: # если уже создал свою команду
                    await self.sio.emit(self.MESSAGES['CREATE_TEAM'], False)
                    return
            self.__deleteUserFromAllTeams(user, sid)
            roomId = Common().getRoomId()
            passwordTeam = Common().generatePasswordForLobby() #генерируется из больших англ. букв длиной 7
            self.__teams[user['token']] = dict(passwordTeam=passwordTeam,players=[Player(user['token'], sid, False)],roomId=roomId)
            self.sio.enter_room(sid, roomId)
            await self.sio.emit(self.MESSAGES['TEAM_LIST'], self.__teams)
            await self.sio.emit(self.MESSAGES['CREATE_TEAM'], dict(passwordTeam=passwordTeam), roomId)
            return
        await self.sio.emit(self.MESSAGES['CREATE_TEAM'], False)
