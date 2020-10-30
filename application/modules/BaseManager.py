class BaseManager:
    def __init__(self, db = None, mediator = None, sio = None, MESSAGES = None):
        self.db = db
        self.mediator = mediator
        self.sio = sio
        self.MESSAGES = MESSAGES
        self.TRIGGERS = self.mediator.getTriggers()
        self.EVENTS = self.mediator.getEvents()
