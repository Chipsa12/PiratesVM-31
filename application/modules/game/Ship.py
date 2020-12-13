class Ship:
    def __init__(self, data):
        self.id = data['id']
        self.team = data['team']
        self.furniture = data['furniture']

    def get(self):
        return dict(id=self.id, teamId=self.team['id'], furniture=self.furniture)

    def getSelf(self):
        return dict(id=self.id, team=self.team, furniture=self.furniture)
