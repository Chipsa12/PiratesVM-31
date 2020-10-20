import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../button/button';
import Textarea from '../textarea/textarea';
import Messages from '../messages/messages';
import AuthContext from '../../../contexts/auth.context';
import { addMessages, sendMessage } from '../../../redux/actions/chat.actions';
import { selectMessages } from '../../../redux/selectors/chat.selectors';
import socket from '../../../helpers/socket';
import { SOCKET_EVENTS } from '../../../constants/socket.constants';
import { eventTypes } from '../../../constants/event-types';
import { MAX_CHAT_INPUT_LENGTH } from '../../../constants/chat.constants';
import OnlineUsers from "../online-users/online-users";

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

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 293px;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
`;

const Chat = () => {
  const [message, setMessage] = useState('');
  const { token } = useContext(AuthContext);
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscribeToMessages = (newMessages) => dispatch(addMessages(newMessages));
    socket.on(SOCKET_EVENTS.SEND_MESSAGE, subscribeToMessages);
    return () => {
      socket.off(SOCKET_EVENTS.SEND_MESSAGE, subscribeToMessages);
    };
  }, []);

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(target.value);
  };

  const handleSendMessage = () => {
    if (token && message.trim().length) {
      setMessage('');
      dispatch(sendMessage(socket, { token, message }));
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => event.preventDefault();

  const handleTextareaKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === eventTypes.Enter) {
      handleSendMessage();
    }
  };

  return (
    <StyledChat>
      <Messages messages={messages} />
      <Wrapper>
        <StyledForm onSubmit={handleFormSubmit} className="send-message">
          <Textarea
            id="send-message"
            name="message"
            value={message}
            onKeyUp={handleTextareaKeyUp}
            onChange={handleInputChange}
            maxLength={MAX_CHAT_INPUT_LENGTH}
            placeholder="Введите сообщение"
          />
          <Button type="submit" onClick={handleSendMessage}>{'>'}</Button>
        </StyledForm>
        <OnlineUsers></OnlineUsers>
      </Wrapper>
    </StyledChat>
  );
};

export default Chat;
