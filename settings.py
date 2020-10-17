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
            'LOGOUT': 'LOGOUT'
        },
        'TRIGGERS': {
            'GET_ALL_USERS': 'GET_ALL_USERS',
            'GET_USER_BY_ID': 'GET_USER_BY_ID',
            'GET_USER_BY_TOKEN': 'GET_USER_BY_TOKEN',
            'GET_USER_BY_LOGIN': 'GET_USER_BY_LOGIN',
            'GET_HASH_BY_LOGIN': 'GET_HASH_BY_LOGIN',
            'GET_TOKEN_BY_SID': 'GET_TOKEN_BY_SID',
            'COUNT_DISTANCE': 'COUNT_DISTANCE'
        }
    },
    'MESSAGES': {
        'USER_LOGIN': 'USER_LOGIN',
        'USER_LOGOUT': 'USER_LOGOUT',
        'USER_SIGNUP': 'USER_SIGNUP',

        'SEND_MESSAGE': 'CHAT/SEND_MESSAGE',
        'SUBSCRIBE_ROOM': 'CHAT/SUBSCRIBE_ROOM',
        'UNSUBSCRIBE_ROOM': 'CHAT/UNSUBSCRIBE_ROOM',

        'READY_TO_START': 'LOBBY/READY_TO_START',
    },
}
