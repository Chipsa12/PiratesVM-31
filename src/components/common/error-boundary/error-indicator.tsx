import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../button/button';
import { BASE_URL } from '../../../constants/url.constants';

const errorImage = require('../../../assets/error.png');

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${errorImage});
`;

const StyledErrorIndicator = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
`;

const ErrorButton = styled(Button)`
  color: ${({ theme }) => theme.colors.error};
  width: 50%;
`;

const ErrorIndicator = ({ resetError }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(BASE_URL);
    resetError();
  };

  return (
    <Container>
      <StyledErrorIndicator>
        <h1>Что-то пошло не так.</h1>
        <ErrorButton onClick={handleClick}>На главную</ErrorButton>
      </StyledErrorIndicator>
    </Container>
  );
};

ErrorIndicator.propTypes = {
  resetError: PropTypes.func.isRequired,
};

export default ErrorIndicator;
