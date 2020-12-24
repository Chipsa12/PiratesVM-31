class Player:
    def __init__(self, data=None):
        self.id = data['id']
        self.name = data['name']
        self.readyToStart = data['readyToStart'] if 'readyToStart' in data else False
        self.coordX = data['coordX'] if 'x' in data else 0
        self.coordY = data['coordY'] if 'y' in data else 0


    def get(self):
        return dict(id=self.id,
                    name=self.name,
                    readyToStart=self.readyToStart)

    def getSelf(self):
        return dict(id=self.id,
                    name=self.name,
                    readyToStart=self.readyToStart,
                    coordX=self.coordX,
                    coordY=self.coordY
                    )
