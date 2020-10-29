import { useCallback, useEffect, useState } from 'react';
import md5 from 'md5';
import { TOKEN_STORAGE } from '../constants/storage.constants';
import socket from '../helpers/socket';
import { SOCKET_EVENTS } from '../constants/socket.constants';
import { AuthContextInterface } from '../contexts/auth.context';
import { passwordReg } from '../constants/authorization.constants';
import { UserInterface } from '../interfaces/user.interfaces';

export const USER_DETAILS_INITIAL = {
  id: 1,
  token: localStorage.getItem(TOKEN_STORAGE) || '',
  name: '',
};

const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserInterface>(USER_DETAILS_INITIAL);

  const isValidPassword = (password: string) => passwordReg.test(password);

  const handleLoginSuccess = (user: UserInterface): void => {
    setUserDetails(user);
    setIsAuth(true);
    localStorage.setItem(TOKEN_STORAGE, user.token);
  };

  const login: AuthContextInterface['login'] = useCallback(({ login, password }) => {
    setLoading(true);
    if (isValidPassword(password)) {
      const random = Math.random();
      const hash = md5(md5(password + login) + random);
      socket.emit(SOCKET_EVENTS.USER_LOGIN, { login, hash, random });
      socket.once(SOCKET_EVENTS.USER_LOGIN, (data) => {
        if (data) {
          handleLoginSuccess(data);
        }
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    if (!isAuth) {
      setLoading(true);
      socket.emit(SOCKET_EVENTS.USER_AUTOLOGIN, { token: userDetails.token });
      socket.once(SOCKET_EVENTS.USER_AUTOLOGIN, (data) => {
        if (data) {
          handleLoginSuccess(data)
        }
        setLoading(false);
      });
    }
  }, []);

  const logout: AuthContextInterface['logout'] = useCallback(() => {
    setLoading(true);
    socket.emit(SOCKET_EVENTS.USER_LOGOUT, { token: userDetails.token });
    socket.once(SOCKET_EVENTS.USER_LOGOUT, (isLogout) => {
      if (isLogout) {
        setUserDetails(USER_DETAILS_INITIAL);
        setIsAuth(false);
        localStorage.setItem(TOKEN_STORAGE, '');
      }
      setLoading(false);
    });
  }, [userDetails.token]);

  const registration: AuthContextInterface['registration'] = useCallback(({ login, password }) => {
    setLoading(true);
    if (isValidPassword(password)) {
      const hash = md5(password + login);
      socket.emit(SOCKET_EVENTS.USER_SIGNUP, { login, hash })
      socket.once(SOCKET_EVENTS.USER_SIGNUP, (data) => {
        if (data) {
          setUserDetails(data);
          setIsAuth(true);
          localStorage.setItem(TOKEN_STORAGE, data.token);
        }
        setLoading(false);
      })
    }
  }, []);

  return { isAuth, userDetails, loading, login, logout, registration };
};

export default useAuth;
