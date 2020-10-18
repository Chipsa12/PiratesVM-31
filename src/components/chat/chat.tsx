import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../button/button';
import Input from '../input/input';
import Messages, { MessagesInterface } from '../messages/messages';
import AuthContext from '../../contexts/auth.context';
import socket from '../../helpers/socket';
import { SOCKET_EVENTS } from '../../constants/socket.constants';
import { MessageInterface } from '../messages/message/message';

const StyledChat = styled.div`
  padding: 20px 10px;
  width: 100%;
  height: 100%;
  max-width: 700px;
  max-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
`;

const Chat = () => {
  const messageRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<MessagesInterface['messages']>([]);
  const [message, setMessage] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const subscribeToMessages = (message: MessageInterface) => setMessages(messages => [...messages, message]);
    socket.on(SOCKET_EVENTS.SEND_MESSAGE, subscribeToMessages);
    return () => {
      socket.removeListener(SOCKET_EVENTS.SEND_MESSAGE, subscribeToMessages)
    };
  }, []);

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(target.value);
  };

  const handleSendMessage = () => {
    if (message.trim().length) {
      socket.emit(SOCKET_EVENTS.SEND_MESSAGE, { token, message }, () => {
        setMessage('');
        messageRef.current?.focus();
      });
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => event.preventDefault();

  return (
    <StyledChat>
      <Messages messages={messages} />
      <StyledForm onSubmit={handleFormSubmit} className="send-message">
        <Input
          id="send-message"
          type="text"
          name="message"
          value={message}
          onChange={handleInputChange}
          placeholder="Введите сообщение"
          autoComplete="off"
        />
        <Button type="submit" onClick={handleSendMessage}>{'>'}</Button>
      </StyledForm>
    </StyledChat>
  );
};

export default Chat;
