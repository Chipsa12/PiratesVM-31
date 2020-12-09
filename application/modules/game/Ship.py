class Ship:
    def __init__(self, data):
        self.id = data['id']
        self.team = data['team']
        self.furniture = data['furniture']
        self.health = 100

    def get(self):
        return dict(id=self.id, team=self.team, furniture=self.furniture, health=self.health)