import psycopg2
import psycopg2.extras


# декоратор для сериализации ответа в словарь (объект)
def toDict(func):
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


# декоратор для сериализации ответа в строку
def toString(func):
    def wrapper(*args, **kwargs):
        rows = func(*args, **kwargs)
        for key in rows[0]:
            return rows[0][key]

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
            print('Я подключился!')
        except ValueError as err:
            print('Всё сдохло!', err)

    def __del__(self):
        self.cursor.close()
        self.connect.close()

    @toDict
    def getAllUsers(self):
        self.cursor.execute("SELECT id, name, login, token FROM users")
        return self.cursor.fetchall()

    @toDict
    def getUserById(self, userId):
        query = "SELECT id, name, login, token FROM users WHERE id = %s"
        self.cursor.execute(query, userId)
        return self.cursor.fetchall()

    @toDict
    def getUserByLogin(self, login):
        query = "SELECT id, name, login, token FROM users WHERE login = %s"
        self.cursor.execute(query, [login])
        return self.cursor.fetchall()

    def insertUser(self, name, login, hash, token=""):
        query = "INSERT INTO users (name, login, password, token) VALUES (%s, %s, %s, %s)"
        self.cursor.execute(query, (name, login, hash, token))
        self.connect.commit()
        return True

    @toString
    def getHashByLogin(self, login):
        query = "SELECT password FROM users WHERE login = %s"
        self.cursor.execute(query, [login])
        return self.cursor.fetchall()

    def updateTokenByLogin(self, login, token):
        query = "UPDATE users SET token = %s WHERE login = %s "
        self.cursor.execute(query, (token, login))
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
