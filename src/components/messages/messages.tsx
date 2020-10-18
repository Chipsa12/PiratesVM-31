import React from 'react';
import styled from 'styled-components';
import Message, { MessageInterface } from './message/message';
import Scrollbar from '../scrollbar/scrollbar';

const StyledMessages = styled.div`
  display: flex;
  flex-flow: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.fg};
  width: 100%;
  height: 100%;
`;

export interface MessagesInterface {
  messages: MessageInterface[];
}

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
