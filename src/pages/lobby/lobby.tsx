import React from 'react';
import styled from 'styled-components';
import Chat from '../../components/chat';
import Title from '../../components/title';
import Teams from '../../components/teams';

const StyledWrapper = styled.div`
  padding: 2px 4px 20px;
  max-width: 801px;
  width: 100%;
  background: ${(({ theme }) => theme.colors.primary)};
`;

const Lobby = () => (
  <StyledWrapper>
    <Title title="Найти игру"/>
    <Teams />
    <Chat/>
  </StyledWrapper>
);

export default Lobby;
