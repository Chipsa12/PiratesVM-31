import React from 'react';
import styled from 'styled-components';
import Chat from '../common/chat';
import { Container } from '../authorization';
import Title from '../common/title';
import Teams from '../common/teams';

const StyledWrapper = styled.div`
  padding: 2px 4px 20px;
  max-width: 801px;
  width: 100%;
  background: ${(({ theme }) => theme.colors.primary)};
`;

const Lobby = () => (
  <Container>
    <StyledWrapper>
      <Title title="Найти игру"/>
      <Teams />
      <Chat/>
    </StyledWrapper>
  </Container>
);

export default Lobby;
