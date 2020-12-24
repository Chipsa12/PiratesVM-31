class Message:
    def __init__(self, data):
        self.userId=data['userId']
        self.name = data['name']
        self.message = data['message']
        self.roomId = data['room'] if 'room' in data else ''

    def get(self):
        return dict(userId=self.userId,name=self.name, message=self.message)

    def getSelf(self):
        return dict(userId=self.userId,name=self.name, message=self.message, roomId=self.roomId)
