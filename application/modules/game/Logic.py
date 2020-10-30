from math import hypot


class Logic:
    def __init__(self, mediator):
        self.__mediator = mediator
        self.__TRIGGERS = self.__mediator.getTriggers()
        self.__EVENTS = self.__mediator.getEvents()
        self.__mediator.set(self.__TRIGGERS['COUNT_DISTANCE'], self.countDistance)

    # посчитать дистанцию между двумя точками
    def countDistance(self, data):
        point1 = data['point1']
        point2 = data['point2']
        if (isinstance(point1.x, (float, int))
                and isinstance(point1.y, (float, int))
                and isinstance(point2.x, (float, int))
                and isinstance(point2.y, (float, int))):
            return hypot(point2.x - point1.x, point2.y - point1.y)
