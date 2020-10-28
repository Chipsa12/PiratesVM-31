
from time import gmtime, strftime,  localtime

from aiohttp import web
import socketio

from settings import SETTINGS
from application.modules.db.DB import DB
from application.modules.mediator.Mediator import Mediator
from application.modules.user.UserManager import UserManager
from application.modules.chat.ChatManager import ChatManager
from application.modules.lobby.LobbyManager import LobbyManager
# audio ?
# pirates
from application.modules.game.Logic import Logic
from application.router.Router import Router
from application.socket.Socket import Socket

db = DB(SETTINGS['DB'])
mediator = Mediator(SETTINGS['MEDIATOR']['EVENTS'], SETTINGS['MEDIATOR']['TRIGGERS'])

sio = socketio.AsyncServer(cors_allowed_origins="*")
app = web.Application()
sio.attach(app)
Router(app, web, mediator)
Logic(mediator)

UserManager(db, mediator, sio, SETTINGS['MESSAGES'])
ChatManager(db, mediator, sio, SETTINGS['MESSAGES'], SETTINGS['CHAT'])
LobbyManager(
    mediator=mediator,
    sio=sio,
    MESSAGES=SETTINGS['MESSAGES']
)



print('i am here in my heart')

web.run_app(app, port=9000)
