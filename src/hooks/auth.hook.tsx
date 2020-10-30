import { useCallback, useState } from 'react';
import md5 from 'md5';
import { TOKEN_STORAGE } from '../constants/storage.constants';
import socket from '../helpers/socket';
import { SOCKET_EVENTS } from '../constants/socket.constants';
import { AuthContextInterface } from '../contexts/auth.context';
import { passwordReg } from '../constants/authorization.constants';

const useAuth = () => {
  const [token, setToken] = useState('');

  const isValidPassword = (password: string) => passwordReg.test(password);

  const login: AuthContextInterface['login'] = useCallback(({ login, password }) => {
    if (isValidPassword(password)) {
      const random = Math.random();
      const hash = md5(md5(password + login) + random);
      socket.emit(SOCKET_EVENTS.USER_LOGIN, { login, hash, random });
      socket.once(SOCKET_EVENTS.USER_LOGIN, ({ token }: { token: string}) => {
        if (token) {
          setToken(token);
          localStorage.setItem(TOKEN_STORAGE, token);
        }
      });
    }
  }, []);

  const logout: AuthContextInterface['logout'] = useCallback(() => {
    socket.emit(SOCKET_EVENTS.USER_LOGOUT, { token });
    socket.once(SOCKET_EVENTS.USER_LOGOUT, (isLogout) => {
      if (isLogout) {
        setToken('');
        localStorage.setItem(TOKEN_STORAGE, '');
      }
    });
  }, [token]);

  const registration: AuthContextInterface['registration'] = useCallback(({ login, password }) => {
    if (isValidPassword(password)) {
      const hash = md5(password + login);
      socket.emit(SOCKET_EVENTS.USER_SIGNUP, { login, hash })
      socket.once(SOCKET_EVENTS.USER_SIGNUP, ({ token }: { token: string}) => {
        if (token) {
          setToken(token);
          localStorage.setItem(TOKEN_STORAGE, token);
        }
      })
    }
  }, []);

  return { login, logout, token, registration };
};

export default useAuth;
