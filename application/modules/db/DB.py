import psycopg2
import psycopg2.extras


# декоратор для сериализации ответа в словарь (объект)
def toDict(func):
    def wrapper(*args, **kwargs):
        row = func(*args, **kwargs)
        d = {}
        if row:
            for key in row:
                d[key] = row[key]
            return d
        else:
            return None

    return wrapper


# декоратор для сериализации ответа в массив словарей (объект)
def toArrayOfDicts(func):
    def wrapper(*args, **kwargs):
        rows = func(*args, **kwargs)
        arr = []
        for row in rows:
            d = {}
            for key in row:
                d[key] = row[key]
            arr.append(d)
        return arr

    return wrapper


# декоратор для сериализации первого поля ответа в строку
def toString(func):
    def wrapper(*args, **kwargs):
        row = func(*args, **kwargs)
        for key in row:
            return row[key]

    return wrapper


class DB:
    def __init__(self, db):
        try:
            self.connect = psycopg2.connect(
                database=db['NAME'],
                user=db['USER'],
                password=db['PASS'],
                host=db['HOST'],
                port=db['PORT']
            )
            self.cursor = self.connect.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
            print('Я подключился к БД!')
        except ValueError as err:
            print('Всё сдохло!', err)

    def __del__(self):
        self.cursor.close()
        self.connect.close()

    @toArrayOfDicts
    def getAllUsers(self):
        self.cursor.execute("SELECT id, name, login, token FROM users")
        return self.cursor.fetchall()

    @toArrayOfDicts
    def getUsersOnline(self):
        self.cursor.execute("SELECT id, name, login, token FROM users WHERE token != '' ")
        return self.cursor.fetchall()

    @toDict
    def getUserById(self, userId):
        query = "SELECT id, name, login, token FROM users WHERE id = %s"
        self.cursor.execute(query, [userId])
        return self.cursor.fetchone()

    @toDict
    def getUserByLogin(self, login):
        query = "SELECT id, name, login, token FROM users WHERE login = %s"
        self.cursor.execute(query, [login])
        return self.cursor.fetchone()

    @toDict
    def getUserByToken(self, token):
        query = "SELECT id, name, login, token FROM users WHERE token = %s"
        self.cursor.execute(query, [token])
        return self.cursor.fetchone()

    @toDict
    def getFurnitureByName(self, name):
        query = "SELECT id, name, chance_of_breakdown, durability, time_to_do_task FROM furniture WHERE name = %s"
        self.cursor.execute(query, [name])
        return self.cursor.fetchone()

    def insertUser(self, name, login, password, token=None):
        query = "INSERT INTO users (name, login, password, token) VALUES (%s, %s, %s, %s)"
        self.cursor.execute(query, (name, login, password, token))
        self.connect.commit()
        return True

    @toString
    def getHashByLogin(self, login):
        query = "SELECT password FROM users WHERE login = %s"
        self.cursor.execute(query, [login])
        return self.cursor.fetchone()

    def updateTokenByLogin(self, login, token):
        query = "UPDATE users SET token = %s WHERE login = %s "
        self.cursor.execute(query, (token, login))
        self.connect.commit()
        return True

    def updateUserTokenById(self, id, token):
        query = "UPDATE users SET token = %s WHERE id = %s "
        self.cursor.execute(query, (token, id))
        self.connect.commit()
        return True

    @toDict
    def getAllTestResults(self):
        query = "SELECT id, name, result, date_time FROM tests ORDER BY date_time"
        self.cursor.execute(query)
        return self.cursor.fetchall()

    @toDict
    def getTestByDate(self, year, month, day):
        query = "SELECT id, name, result, date_time FROM tests WHERE EXTRACT(YEAR FROM date_time) <= %s AND EXTRACT(MONTH FROM date_time) <= %s AND EXTRACT(DAY FROM date_time) <= %s"
        self.cursor.execute(query, (year, month, day))
        return self.cursor.fetchall()

    # записать один результат теста
    def insertTestResult(self, name, result):
        query = "INSERT INTO tests (name, result, date_time) VALUES (%s, %s, now())"
        self.cursor.execute(query, (name, result))
        self.connect.commit()
        return True

    def insertMessage(self, data):
        query = 'INSERT INTO messages (message, name, room, time) VALUES (%s, %s, %s, now())'
        self.cursor.execute(query, (data['message'], data['name'], data['room']))
        self.connect.commit()
        return True

    @toArrayOfDicts
    def getAllFurniture(self):
        self.cursor.execute("SELECT id, name, chance_of_breakdown, durability, time_to_do_task FROM furniture ")
        return self.cursor.fetchall()

    def insertTeam(self, teamId, name, password, isPrivate, maxPlayers, roomId, playersId):
        query = "INSERT INTO teams (team_id, name, password, is_private, max_players, room_id, players_id) VALUES (" \
                "%s, %s, %s, %s, %s, %s, %s)"
        self.cursor.execute(query, (teamId, name, password, isPrivate, maxPlayers, roomId, playersId))
        self.connect.commit()
        return True

    def insertShip(self, shipId, teamId, furnitureId):
        query = "INSERT INTO ships (ship_id, team_id, globalCoord) VALUES (%s, %s, %s)"
        self.cursor.execute(query, (shipId, teamId, furnitureId))
        self.connect.commit()
        return True


    def deleteShip(self, shipId):
        query = "DELETE FROM ships WHERE ship_id == %s"
        self.cursor.execute(query, shipId)
        self.connect.commit()
        return True

    def deleteTeam(self, teamId):
        query = "DELETE FROM teams WHERE team_id == %s"
        self.cursor.execute(query, teamId)
        self.connect.commit()
        return True

    def updateTeam(self, teamId, playerId):
        query = "UPDATE teams SET players_id = %s WHERE team_id = %s "
        self.cursor.execute(query, (playerId, teamId))
        self.connect.commit()
        return True

    def getPlayersIdByTeamId(self, teamId):
        query = "SELECT players_id FROM teams"
        self.cursor.execute(query)
        return self.cursor.fetchall()