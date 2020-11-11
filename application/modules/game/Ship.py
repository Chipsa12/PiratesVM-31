class Ship:
    def __init__(self, data):
        self.id = data['id']
        self.team = data['team']
        self.wheel = data['wheel']
        self.rope = data['rope']
        self.cannon = data['cannon']
        self.anchor = data['anchor']
        self.health = 100

    def get(self):
        return dict(id=self.id, team=self.team, wheel=self.wheel, rope=self.rope, cannon=self.cannon, anchor=self.anchor, health=self.health)