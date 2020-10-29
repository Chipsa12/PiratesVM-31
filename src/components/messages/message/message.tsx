import React from 'react';
import styled from 'styled-components';
import { MessageInterface } from '../../../interfaces/chat.interfaces';

const StyledMessage = styled.div`
  display: flex;
  margin: 5px 0;
  padding: 5px 15px;
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
`;

const UserName = styled.div`
  margin-right: 10px;
`;

const UserMessage = styled.div`
  display: inline-flex;
  word-break: break-word;
`;

const Message: React.FC<MessageInterface> = ({
  name,
  message,
}): React.ReactElement => (
  <StyledMessage>
    <UserName>{name}: </UserName>
    <UserMessage>{message}</UserMessage>
  </StyledMessage>
);

export default Message;
