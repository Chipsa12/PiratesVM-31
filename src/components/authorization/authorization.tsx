import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/auth.context';
import styled from 'styled-components';
import Button from '../common/button';
import Input from '../common/input';
import Banner from '../common/banner';
import { passwordReg } from '../../constants/authorization.constants';
import Tooltip from '../common/tooltip';

const authBackground = require('../../assets/auth.png');

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${authBackground}) no-repeat;
  background-size: cover;
  color: ${props => props.theme.colors.text};
`;

const StyledForm = styled.form`
  padding: 30px 10px;
  display: flex;
  flex-flow: column;
`;

const StyledControlButtons = styled.div`
  margin-top: 40px;
  display: flex;
  flex-flow: column;
`;

const StyledInput = styled(Input)`
  width: 100%;
  color: ${props => props.theme.colors.light};
  text-transform: initial;
  border-color: ${props => props.theme.colors.light};
  border-radius: 4px;
  
  &::placeholder {
    color: ${props => props.theme.colors.light};
  }
`;

const StyledAuthButton = styled(Button)`
  box-shadow: 0 4px 0 ${props => props.theme.colors.blacks[0]};
`;

const StyledSignupButton = styled(Button)`
  box-shadow: 0 4px 0 ${props => props.theme.colors.blacks[0]};
  background: ${props => props.theme.colors.light};
  color: ${props => props.theme.colors.primary};
`;

const Authorization = () => {
  const { login, registration } = useContext(AuthContext);
  const [form, setForm] = useState({ login: '', password: '' });


  const handleChange = ({ target }): void => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login(form);
  };

  const handleSignup = (event) => {
    event.preventDefault();
    registration(form);
  }

  return (
    <Container>
      <StyledForm>
        <Banner />
        <StyledInput
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
          <StyledInput
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
        <StyledControlButtons>
          <StyledAuthButton
            variant="secondary"
            type="submit"
            onClick={handleLogin}
          >
            Авторизоваться
          </StyledAuthButton>
          <StyledSignupButton
            variant="secondary"
            type="submit"
            onClick={handleSignup}
          >
            Зарегистрироваться
          </StyledSignupButton>
        </StyledControlButtons>
      </StyledForm>
    </Container>
  );
};

export default Authorization;
