class Team:
    def __init__(self, data):
        self.teamId = data['teamId']
        self.ownerName = data['ownerName']
        self.name = data['name']
        self.players = data['players']
        self.password = data['password']
        self.isPrivate = data['isPrivate']
        self.maxPlayers = data['maxPlayers']
        self.roomId = data['roomId']

    def get(self):
        players = []
        if len(self.players) != 0:
            for player in self.players:
                players.append(player.get())
        return dict(teamId=self.teamId,
                    ownerName=self.ownerName,
                    name=self.name,
                    players=players,
                    playersCount=len(self.players),
                    password=self.password,
                    isPrivate=self.isPrivate
                    )

    def getSelf(self):
        return dict(teamId=self.teamId,
                    name=self.name,
                    players=self.players,
                    playersCount=len(self.players),
                    password=self.password,
                    isPrivate=self.isPrivate,
                    maxPlayers=self.maxPlayers,
                    roomId=self.roomId
                    )
