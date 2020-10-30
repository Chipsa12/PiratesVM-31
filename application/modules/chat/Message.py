class Message:
    def __init__(self, data):
        self.name = data['name']
        self.message = data['message']
        self.room = data['room'] if 'room' in data else ''

    def get(self):
        return dict(name=self.name, message=self.message)

    def getSelf(self):
        return dict(userId=self.userId, message=self.message, room=self.room)
