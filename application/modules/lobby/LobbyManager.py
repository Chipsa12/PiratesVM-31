from application.modules.BaseManager import BaseManager
# генерация пароля для лобби и roomId
from application.modules.common.Common import Common
from .Player import Player
from .Team import Team

class LobbyManager(BaseManager):
    def __init__(self, mediator, sio, MESSAGES):
        super().__init__(mediator=mediator, sio=sio, MESSAGES=MESSAGES)

        self.__teams = {}

        '''self.__teams[1] = Team(dict(
            teamId=1,
            ownerName='1',
            name='QQWWE',
            password='12312',
            isPrivate=True,
            players=[
                Player(dict(id=1, name='1')),
                Player(dict(id=2, name='2', readyToStart=True))],
            maxPlayers=3,
            roomId="323"
        ))

        self.__teams[2] = Team(dict(
            teamId=2,
            ownerName='2',
            name='44343',
            password='123324312',
            isPrivate=True,
            players=[
                Player(dict(id=2, name='3')),
                #Player(dict(id=10, name='mrlodard')),
                Player(dict(id=3, name='4', readyToStart=True))],
            maxPlayers=3,
            roomId="333"
        ))'''


        #TRIGGERS
        self.mediator.set(self.TRIGGERS['GET_ROOM_ID'], self.__getRoomId)
        self.mediator.set(self.TRIGGERS['TEAM_LIST'], self.__getTeamList)
        self.mediator.set(self.TRIGGERS['REMOVE_TEAM'], self.__removeTeam)
        #EVENTS
        # Если чел дисконектнулся, тогда вызывать leaveTeam и вызывать событие logout
        self.mediator.subscribe(self.EVENTS['USER_LOGOUT'], self.__disconnect)
        #
        self.sio.on(self.MESSAGES['CREATE_TEAM'], self.createTeam)
        self.sio.on(self.MESSAGES['UPDATE_TEAM_LIST'], self.updateTeamList)
        self.sio.on(self.MESSAGES['KICK_FROM_TEAM'], self.kickFromTeam)
        self.sio.on(self.MESSAGES['LEAVE_TEAM'], self.leaveTeam)
        self.sio.on(self.MESSAGES['READY_TO_START'], self.readyToStart)
        self.sio.on(self.MESSAGES['JOIN_TO_TEAM'], self.joinToTeam)
        self.sio.on(self.MESSAGES['INVITE_TO_TEAM'], self.inviteToTeam)


    async def __disconnect(self, data):
        await self.leaveTeam(data['sid'], data)

    def __getUserByToken(self, data):
        if 'token' in data:
            return self.mediator.get(self.TRIGGERS['GET_USER_BY_TOKEN'], data)
        return None

    def __getRoomId(self, data):
        if 'token' in data:
            user = self.__getUserByToken(data=data)
            if user:
                team = self.__getTeamByUserId(userId=user['id'])
                if team:
                    return team.getSelf()['roomId']
        return False

    def __deleteEmptyTeams(self):
        for key in self.__teams:
            team = self.__teams[key].getSelf()
            users = team['players']
            if len(users) == 0:
                del self.__teams[team['teamId']]
                return
        return None

    def __deleteUserFromTeam(self, userId, team):
        users = team['players']
        for user in users:
            if user.getSelf()['id'] == userId:
                users.remove(user)
                return
        return None

    def __deleteUserFromAllTeams(self, userId, sid):
        for key in self.__teams:
            team = self.__teams[key].getSelf()
            for user in team['players']:
                if user.getSelf()['id'] == userId:
                    if userId == team['teamId']:
                        del self.__teams[userId]
                    self.__deleteUserFromTeam(userId=userId, team=team)
                    self.sio.leave_room(sid, team['roomId'])
                    continue
        self.__deleteEmptyTeams()
        return

    def __getTeamByUserId(self, userId):
        for key in self.__teams:
            team = self.__teams[key]
            users = team.getSelf()['players']
            for user in users:
                if userId == user.getSelf()['id']:
                    return team
        return False

    def __findPlayerInTeam(self, userId, team):
        players = team.getSelf()['players']
        for player in players:
            if player.getSelf()['id'] == userId:
                return player.getSelf()
        return False

    def __checkTeamIsReady(self, team):
        countPlayers = 0
        players = team['players']
        for player in players:
            if player.get()['readyToStart']:
                countPlayers += 1
                if countPlayers >= (team['maxPlayers'] / 2) and countPlayers <= team['maxPlayers']:
                    return True
        return False

    def __isOwner(self, userId):
        for key in self.__teams:
            team = self.__teams[key].getSelf()
            if userId == team['teamId']:
                return True
        return False

    def __findTeamByPassword(self, password):
        for key in self.__teams:
            team = self.__teams[key]
            if password == team.getSelf()['password']:
                return team
        return None

    def __findTeamByTeamId(self, teamId):
        for key in self.__teams:
            team = self.__teams[key]
            if team.getSelf()['teamId'] == teamId:
                return team
        return None

    def __getTeamList(self, data):
        if data:
            teams = []
            for key in self.__teams:
                team = self.__teams[key].get()
                #del team['players']
                teams.append(team)
            return teams
        return None

    def __removeTeam(self, team):
        if team:
            for player in team['players'].getSelf():
                user = self.mediator.get(self.TRIGGERS['GET_USER_BY_ID'], dict(id=player['id']))
                team['players'].remove(player)
                self.sio.leave_room(user['sid'], team['roomId'])
                if len(team['players']) == 0:
                    del self.__teams[team['id']]
            return True
        return False

    def __updatePlayersId(self, userId, teamId):
        playersId = self.db.getPlayersIdByTeamId(teamId)
        playersId.append(userId)
        self.db.updateTeam(teamId, playersId)
        return

    def __deletePlayerId(self, userId, teamId):
        playersId = self.db.getPlayersIdByTeamId(teamId)
        for playerId in playersId:
            if playerId == userId:
                playersId.remove(userId)
        self.db.updateTeam(teamId, playersId)
        return

    async def updateTeamList(self, sid, data):
        teams = []
        for key in self.__teams:
            team = self.__teams[key].get()
            teams.append(team)
        await self.sio.emit(self.MESSAGES['UPDATE_TEAM_LIST'], teams, room=sid)
        return

    async def createTeam(self, sid, data):
        owner = self.__getUserByToken(data=data)
        if owner:
            self.__deleteUserFromAllTeams(userId=owner['id'], sid=sid)
            common = Common()
            roomId = common.getRoomId()
            passwordTeam = common.generatePasswordForLobby()# генерируется из больших англ. букв длиной 7
            self.__teams[owner['id']] = Team(dict(
                                        teamId=owner['id'],
                                        ownerName=owner['name'],
                                        name=data['name'],
                                        players=[Player(dict(id=owner['id'],
                                                             name=owner['name'],
                                                             coordX=0,
                                                             coordY=0))],#преобразовать в JSON
                                        password=passwordTeam if data['isPrivate'] else '',
                                        isPrivate=data['isPrivate'],
                                        maxPlayers=data['maxPlayers'] if 'maxPlayers' in data else 10,
                                        roomId=roomId
                                        ))
            self.sio.enter_room(sid, roomId)
            await self.sio.emit(self.MESSAGES['CREATE_TEAM'], self.__teams[owner['id']].get(), room=roomId)
            await self.sio.emit(self.MESSAGES['UPDATE_TEAM_LIST'], self.__teams[owner['id']].get())
            return True
        await self.sio.emit(self.MESSAGES['CREATE_TEAM'], False, room=sid)
        return False

    async def leaveTeam(self, sid, data):
        user = self.__getUserByToken(data=data)
        if user:
            team = self.__getTeamByUserId(userId=user['id'])
            if team:
                roomId = team.getSelf()['roomId']
                self.__deleteUserFromAllTeams(userId=user['id'], sid=sid)
                await self.sio.emit(self.MESSAGES['LEAVE_TEAM'], dict(id=user['id']), room=roomId)
                await self.sio.emit(self.MESSAGES['UPDATE_TEAM_LIST'], team.get())
                return True
        await self.sio.emit(self.MESSAGES['LEAVE_TEAM'], False, room=sid)
        return False

    async def readyToStart(self, sid, data):
        owner = self.__getUserByToken(data=data)
        if owner:
            team = self.__getTeamByUserId(userId=owner['id']).getSelf()
            player = self.__findPlayerInTeam(userId=owner['id'], team=team)
            if player:
                player['readyToStart'] = True
                if self.__checkTeamIsReady(team=team):
                    await self.sio.emit(self.MESSAGES['READY_TO_START'], True, room=team['roomId'])
                    #начать игру...
                    self.mediator.call(self.EVENTS['START_GAME'], dict(team=team, owner=player, sid=sid))
                    return True
        await self.sio.emit(self.MESSAGES['READY_TO_START'], False, room=sid)
        return False

    async def kickFromTeam(self, sid, data):
        owner = self.__getUserByToken(data=data)
        ejectedId = data['id']
        if owner and ejectedId:
            team = self.__getTeamByUserId(userId=ejectedId)
            if self.__isOwner(userId=owner['id']) and team:
                roomId = team.getSelf()['roomId']
                self.sio.leave_room(sid, roomId)
                self.__deleteUserFromTeam(userId=ejectedId, team=team.getSelf())
                await self.sio.emit(self.MESSAGES['KICK_FROM_TEAM'], True, room=sid)
                await self.sio.emit(self.MESSAGES['UPDATE_TEAM_LIST'], team.get())
                return True
        await self.sio.emit(self.MESSAGES['KICK_FROM_TEAM'], False, room=sid)
        return False

    async def joinToTeam(self, sid, data):
        user = self.__getUserByToken(data=data)
        if user:
            team = self.__findTeamByTeamId(teamId=data['teamId'])
            if team and (team.getSelf()['playersCount'] < team.getSelf()['maxPlayers']):
                if team.getSelf()['isPrivate'] and (team.getSelf()['password'] == data['password']):
                    self.__deleteUserFromAllTeams(userId=user['id'], sid=sid)
                    team.getSelf()['players'].append(Player(dict(id=user['id'],
                                                                 name=user['name']
                                                                 )))
                    self.sio.enter_room(sid, team.getSelf()['roomId'])
                    await self.sio.emit(self.MESSAGES['JOIN_TO_TEAM'], True, room=sid)
                    await self.sio.emit(self.MESSAGES['UPDATE_TEAM_LIST'], team.get())
                    return True
                else:
                    self.__deleteUserFromAllTeams(userId=user['id'], sid=sid)
                    team.getSelf()['players'].append(Player(dict(id=user['id'],
                                                                 name=user['name']
                                                                 )))
                    self.sio.enter_room(sid, team.getSelf()['roomId'])
                    await self.sio.emit(self.MESSAGES['JOIN_TO_TEAM'], True, room=sid)
                    await self.sio.emit(self.MESSAGES['UPDATE_TEAM_LIST'], team.get())
                    return True
        await self.sio.emit(self.MESSAGES['JOIN_TO_TEAM'], False, room=sid)
        return False

    async def inviteToTeam(self, sid, data):
        owner = self.__getUserByToken(data=data)
        inviteUserId = data['userId']
        isAgree = data['isAgree']
        if owner and inviteUserId and isAgree:
            team = self.__getTeamByUserId(owner['id'])
            if team and (team.getSelf()['playersCount'] < team.getSelf()['maxPlayers']):
                if self.__isOwner(userId=owner['id']):
                    teamInviteUser = self.__getTeamByUserId(userId=inviteUserId)
                    if teamInviteUser:
                        self.__deleteUserFromTeam(userId=inviteUserId, team=teamInviteUser.getSelf())
                    user = self.mediator.get(self.TRIGGERS['GET_USER_BY_ID'], dict(id=inviteUserId))
                    if user:
                        team = self.__getTeamByUserId(userId=owner['id'])
                        team.getSelf()['players'].append(Player(dict(id=user['id'],
                                                                     name=user['name']
                                                                     )))
                        await self.sio.emit(self.MESSAGES['INVITE_TO_TEAM'], True, room=sid)
                        await self.sio.emit(self.MESSAGES['UPDATE_TEAM_LIST'], team.get())
                        return True
        await self.sio.emit(self.MESSAGES['INVITE_TO_TEAM'], False, room=sid)
        return False
