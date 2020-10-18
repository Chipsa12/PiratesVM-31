import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/auth.context';
import styled from 'styled-components';
import Button from '../button/button';
import Input from '../input/input';
import Banner from '../banner/banner';
import md5 from 'md5';
import authBackground from '../../assets/auth.png';
import { passwordReg } from '../../constants/authorization.constants';
import socket from '../../helpers/socket';
import { SOCKET_EVENTS } from '../../constants/socket.constants';

const Container = styled.div`
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
    socket.on(SOCKET_EVENTS.USER_LOGIN, ({ token }) => login(token))
    socket.on(SOCKET_EVENTS.USER_SIGNUP, ({ token }) => login(token))
  }, []);

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
          onFocus={(event) => event.target.select()}
        />
        <ControlButtons>
          <Button type="submit" onClick={handleLogin}>Авторизоваться</Button>
          <Button type="submit" onClick={handleSignup}>Зарегистрироваться</Button>
        </ControlButtons>
      </Form>
    </Container>
  );
};

export default Authorization;
