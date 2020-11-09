import React from 'react';
import styled from 'styled-components';
import Message from './message';
import Scrollbar from '../scrollbar';
import { MessagesInterface } from '../../interfaces/chat.interfaces';

const StyledMessages = styled.div`
  display: flex;
  flex-flow: column;
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  height: 100%;
`;

const Messages: React.FC<MessagesInterface> = ({
  messages,
}) => (
  <StyledMessages>
    <Scrollbar>
      {messages.map(({ name, message }, index) => <Message key={index} name={name} message={message}/>)}
    </Scrollbar>
  </StyledMessages>
);

export default Messages;
