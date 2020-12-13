class Furniture:
    def __init__(self, db):
        self.db = db


    def get(self):
        return self.db.getAllFurniture()