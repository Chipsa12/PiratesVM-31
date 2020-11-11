SETTINGS = {
    'DB': {
        'NAME': 'vm31-db',
        'HOST': '127.0.0.1',
        'PORT': '5432',
        'USER': 'vm31-user',
        'PASS': '12345678',
    },
    'CHAT': {
        'ECHO_DISTANCE': 10,
        'ROOMS': {
            'ECHO': 'ECHO'
        }
    },
    'ERRORS': {
        'LOGIN_ERROR': 'LOGIN_ERROR',
        'LOGOUT_ERROR': 'LOGOUT_ERROR',
        'REGISTRATION_ERROR': 'REGISTRATION_ERROR'
    },
    'MEDIATOR': {
        'EVENTS': {
            'INSERT_USER': 'INSERT_USER',
            'ADD_USER_ONLINE': 'ADD_USER_ONLINE',
            'DELETE_USER_ONLINE': 'DELETE_USER_ONLINE',
            'UPDATE_TOKEN_BY_LOGIN': 'UPDATE_TOKEN_BY_LOGIN',
            'AUTH': 'AUTH',
            'USER_LOGOUT': 'USER_LOGOUT',
            'START_GAME': 'START_GAME'
        },
        'TRIGGERS': {
            'GET_ALL_USERS': 'GET_ALL_USERS',
            'GET_USER_BY_ID': 'GET_USER_BY_ID',
            'GET_USER_BY_TOKEN': 'GET_USER_BY_TOKEN',
            'GET_USER_BY_LOGIN': 'GET_USER_BY_LOGIN',
            'GET_HASH_BY_LOGIN': 'GET_HASH_BY_LOGIN',
            'GET_TOKEN_BY_SID': 'GET_TOKEN_BY_SID',
            'GET_SID_BY_TOKEN': 'GET_SID_BY_TOKEN',
            'GET_ROOM_ID': 'GET_ROOM_ID',
            'COUNT_DISTANCE': 'COUNT_DISTANCE',
            'TEAM_LIST': 'TEAM_LIST',
            'REMOVE_TEAM': 'REMOVE_TEAM'
        }
    },
    'MESSAGES': {
        'USER_AUTOLOGIN': 'AUTH/USER_AUTOLOGIN',
        'USER_LOGIN': 'AUTH/USER_LOGIN',
        'USER_LOGOUT': 'AUTH/USER_LOGOUT',
        'USER_SIGNUP': 'AUTH/USER_SIGNUP',
        'USERS_ONLINE':'AUTH/USERS_ONLINE',
        
        'SEND_MESSAGE': 'CHAT/SEND_MESSAGE',
        'SEND_MESSAGE_IN_ROOM': 'CHAT/SEND_MESSAGE_IN_ROOM',
        'SUBSCRIBE_ROOM': 'CHAT/SUBSCRIBE_ROOM',
        'UNSUBSCRIBE_ROOM': 'CHAT/UNSUBSCRIBE_ROOM',


        'CREATE_TEAM': 'LOBBY/CREATE_TEAM',
        'JOIN_TO_TEAM': 'LOBBY/JOIN_TO_TEAM',
        'KICK_FROM_TEAM': 'LOBBY/KICK_FROM_TEAM',
        'LEAVE_TEAM': 'LOBBY/LEAVE_TEAM',
        'READY_TO_START': 'LOBBY/READY_TO_START',
        'TEAM_LIST': 'LOBBY/TEAM_LIST',
        'UPDATE_TEAM_LIST': 'LOBBY/UPDATE_TEAM_LIST',
        'INVITE_TO_TEAM': 'LOBBY/INVITE_TO_TEAM',


        'LEAVE_SHIP': 'GAME/LEAVE_SHIP',
        'START_GAME': 'GAME/START_GAME',
        'END_GAME': 'GAME/END_GAME',
    },
}
