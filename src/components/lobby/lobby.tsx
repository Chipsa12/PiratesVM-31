import React from 'react';
import styled from 'styled-components';
import Chat from '../chat/chat';

const StyledLobby = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  background: ${(({ theme }) => theme.bg)};
`;

const Lobby = () => {
  return (
    <StyledLobby>
      <Chat />
    </StyledLobby>
  );
};

export default Lobby;
