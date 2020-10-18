import React from 'react';
import styled from 'styled-components';

export interface MessageInterface {
  name: string;
  message: string;
}

const StyledMessage = styled.div`
  display: flex;
  margin: 5px 0;
  padding: 5px 15px;
  color: ${({ theme }) => theme.fg};
  width: 100%;
  font-size: 2.4rem;
`;

const UserName = styled.div`
  margin-right: 10px;
`;

const UserMessage = styled.div`
  display: inline-flex;
  word-break: break-word;
`;

export interface MessageInterface {
  name: string;
  message: string;
}

const Message: React.FC<MessageInterface> = ({
  name,
  message,
}) => (
  <StyledMessage>
    <UserName>{name}: </UserName>
    <UserMessage>{message}</UserMessage>
  </StyledMessage>
);

export default Message;
