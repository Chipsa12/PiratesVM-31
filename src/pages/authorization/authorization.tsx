import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../contexts/auth.context';
import styled from 'styled-components';
import Button from '../../components/button';
import Input from '../../components/input';
import Banner from '../../components/banner';
import UserSVG from '../../icons/userSVG';
import PasswordSVG from '../../icons/passwordSVG';
import { BASE_URL } from '../../constants/url.constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const BannerWrapper = styled.div`
  height: 171px;
  width: 442px;
  background: linear-gradient(#0D2B29, #0C3632);  
`;

const InputsContainer = styled.div`
  height: 272px;
  width: 442px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#13544E, #168A80);
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 181px;
  width: 442px;
  background: linear-gradient(#10685B, #0E4A46);  
`;

const StyledControlButtons = styled.div`
  display: flex;
  flex-flow: column;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled(Input)`
  width: 86%;
  height: 66px;
  color: ${props => props.theme.colors.whites[0]};
  text-transform: initial;
  border-color: ${props => props.theme.colors.light};
  border-radius: 4px;
  padding-left: 46px;
  
  &::placeholder {
    font-size: ${props => props.theme.fontSizes[0]};
  }
`;

const StyledButton = styled(Button)`
  width: 86%;
  height: 54px;
  font-size: ${props => props.theme.fontSizes[0]};
  box-shadow: 0 4px 0 ${props => props.theme.colors.blacks[0]};
  background: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.primary};
  
  &:hover {
    background: ${({ theme }) => theme.colors.text_accent};
    border: 1px solid;
  }
`;

const Authorization = () => {
  const { userDetails, login, registration } = useContext(AuthContext);
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
    if (userDetails.isAuth) {
      history.replace(BASE_URL);
    }
  }, [userDetails.isAuth, history]);

  return (
    <Container>
      <BannerWrapper>
        <Banner />
      </BannerWrapper>
      <form>
        <InputsContainer>
          <InputWrapper>
            <UserSVG style={{ position: 'absolute', left: 40 }}/>
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
          </InputWrapper>
          <InputWrapper>
            <PasswordSVG style={{ position: 'absolute', left: 40 }}/>
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
              onFocus={(event) => event.target.select()}
            />
          </InputWrapper>
          
        </InputsContainer>
        <ButtonsWrapper>
          <StyledButton
            variant="secondary"
            type="submit"
            onClick={handleLogin}
          >
            Авторизоваться
          </StyledButton>
          <StyledButton
            variant="secondary"
            type="submit"
            onClick={handleSignup}
          >
            Зарегистрироваться
          </StyledButton>
        </ButtonsWrapper>
      </form>
    </Container>
  );
};

export default Authorization;
