class Player:
    def __init__(self, data=None):
        self.id = data['id']
        self.name = data['name']
        self.readyToStart = data['readyToStart'] if 'readyToStart' in data else False

    def get(self):
        return dict(id=self.id, name=self.name, readyToStart=self.readyToStart)
