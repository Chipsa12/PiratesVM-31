class Ship:
    def __init__(self, data):
        self.id = data['id']
        self.team = data['team']
        self.furniture = data['furniture']
        self.globalCoord = 0

    def get(self):
        return dict(id=self.id, teamId=self.team['id'], furniture=self.furniture, globalCoord=self.globalCoord)

    def getSelf(self):
        return dict(id=self.id, team=self.team, furniture=self.furniture, globalCoord=self.globalCoord)
