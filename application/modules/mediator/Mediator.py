class Mediator:
    EVENTS = {}
    TRIGGERS = {}
    events = {}
    triggers = {}

    def __init__(self, EVENTS, TRIGGERS):
        self.EVENTS = EVENTS
        self.TRIGGERS = TRIGGERS
        for key in self.EVENTS.keys():
            self.events.update({self.EVENTS[key]: []})

    def __del__(self):
        self.events.clear()
        self.triggers.clear()

    # TRIGGERS

    def getTriggers(self):
        return self.TRIGGERS

    def set(self, name, func):
        if self.TRIGGERS.get(name) and func:
            self.triggers.update({name: func})

    def get(self, name, data=None):
        if name:
            cb = self.triggers.get(name)
            if cb and cb(data):
                return cb(data)
        return None

    # EVENTS

    def getEvents(self):
        return self.EVENTS

    # подписаться на событие
    def subscribe(self, name, func):
        if self.EVENTS.get(name) and func:
            self.events.update({name: func})
        return None

    # дернуть события (вызвать все колбеки, которые в него прописаны)
    def call(self, name, data=None):
        if name:
            cbs = self.events.get(name)
            if cbs:
                return cbs(data)
        return None
