class Furniture:
    def __init__(self, data=None):
        self.id = data['id']
        self.name = data['name']
        self.coordX = data['coordX'] if 'coordX' in data else 0
        self.coordY = data['coordY'] if 'coordY' in data else 0
        self.chanceOfBreakdown = data['chance_of_breakdown']
        self.durability = data['durability']
        self.timeToDoTask = data['time_to_do_task']
        self.readyToUse = data['ready_to_use'] if 'ready_to_use' in data else True

    def get(self):
        return dict(id=self.id,
                    name=self.name,
                    coordX=self.coordX,
                    coordY=self.coordY,
                    chanceOfBreakdown=self.chanceOfBreakdown,
                    durability=self.durability,
                    timeToDoTask=self.timeToDoTask,
                    readyToUse=self.readyToUse
                    )