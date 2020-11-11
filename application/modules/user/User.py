class User:
    def __init__(self, data):
        self.id = data['id']
        self.name = data['name']
        self.token = data['token']
        self.sid = data['sid']
        self.coord = dict(x=0, y=0)

    # отдать только те поля, которые можно "светить"
    def get(self):
        return dict(id=self.id, name=self.name)

    def getSelf(self):
        return dict(id=self.id, name=self.name, token=self.token, sid=self.sid)
