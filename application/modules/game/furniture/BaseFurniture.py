class BaseFurniture:
    def __init__(self, data=None):
        self.coordX = data['coordX']
        self.coordY = data['coordY']
        self.chanceOfBreakdown = data['chance_of_breakdown']
        self.durability = data['durability']
        self.timeToDoTask = data['time_to_do_task']
        self.readyToUse = data['ready_to_use'] if 'ready_to_use' in data else True

    def get(self):
        return dict(coordX=self.coordX,
                    coordY=self.coordY,
                    chanceOfBreakdown=self.chanceOfBreakdown,
                    durability=self.durability,
                    timeToDoTask=self.timeToDoTask,
                    readyToUse=self.readyToUse
                    )