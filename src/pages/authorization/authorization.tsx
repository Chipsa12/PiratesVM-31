import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../contexts/auth.context';
import styled from 'styled-components';
import Button from '../../components/button';
import Input from '../../components/input';
import Banner from '../../components/banner';
import { passwordReg } from '../../constants/authorization.constants';
import Tooltip from '../../components/tooltip';
import { BASE_URL } from '../../constants/url.constants';

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
  const { loading, userDetails: { token }, login, registration } = useContext(AuthContext);
  const [form, setForm] = useState({ login: '', password: '' });
  const history = useHistory();

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

  useEffect(() => {
    if (!loading && token) {
      history.replace(BASE_URL);
    }
  }, [loading, token, history]);

  return (
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
  );
};

export default Authorization;
