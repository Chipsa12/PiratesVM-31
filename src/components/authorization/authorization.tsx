import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/auth.context';
import styled from 'styled-components';
import Button from '../common/button/button';
import Input from '../common/input/input';
import Banner from '../common/banner/banner';
import md5 from 'md5';
import { passwordReg } from '../../constants/authorization.constants';
import socket from '../../helpers/socket';
import { SOCKET_EVENTS } from '../../constants/socket.constants';
import Tooltip from '../common/tooltip/tooltip';

const authBackground = require('../../assets/auth.png');

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${authBackground}) no-repeat;
  background-size: cover;
`;

const Form = styled.form`
  padding: 30px 10px;
  display: flex;
  flex-flow: column;
`;

const ControlButtons = styled.div`
  margin-top: 40px;
  display: flex;
  flex-flow: column;
`;

const Authorization = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ login: '', password: '' });

  useEffect(() => {
    const signin = ({ token }: { token: string }) => login(token);
    socket.on(SOCKET_EVENTS.USER_LOGIN, signin);
    socket.on(SOCKET_EVENTS.USER_SIGNUP, signin);
    return () => {
      socket.off(SOCKET_EVENTS.USER_LOGIN, signin);
      socket.off(SOCKET_EVENTS.USER_SIGNUP, signin);
    };
  }, [login]);

  const isValidPassword = () => {
    return passwordReg.test(
      form.password,
    );
  };

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (isValidPassword()) {
      const random = Math.random();
      const hash = md5(md5(form.password + form.login) + random);
      socket.emit(SOCKET_EVENTS.USER_LOGIN, { login: form.login, hash, random });
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();
    const { login } = form;
    if (login && isValidPassword()) {
      const hash = md5(form.password + login);
      socket.emit(SOCKET_EVENTS.USER_SIGNUP, { login, hash })
    }
  };

  return (
    <Container>
      <Form>
        <Banner />
        <Input
          id="login"
          type="text"
          placeholder="Логин"
          name="login"
          aria-label="login"
          aria-describedby="login"
          required
          autoComplete="username"
          autoFocus
          onChange={handleChange}
        />
        <Tooltip content="Ваш пароль должен быть от 2 символов, содержащий минимум 1 цифру и букву">
          <Input
            id="password"
            type="password"
            placeholder="Пароль"
            name="password"
            aria-label="password"
            aria-describedby="password"
            required
            autoComplete="current-password"
            onChange={handleChange}
            pattern={`${passwordReg}`}
            onFocus={(event) => event.target.select()}
          />
        </Tooltip>
        <ControlButtons>
          <Button type="submit" onClick={handleLogin}>Авторизоваться</Button>
          <Button type="submit" onClick={handleSignup}>Зарегистрироваться</Button>
        </ControlButtons>
      </Form>
    </Container>
  );
};

export default Authorization;
