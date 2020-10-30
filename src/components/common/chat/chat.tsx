import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../button';
import Textarea from '../textarea';
import Messages from '../messages';
import AuthContext from '../../../contexts/auth.context';
import { addMessages, sendMessage } from '../../../redux/actions/chat.actions';
import { selectMessages } from '../../../redux/selectors/chat.selectors';
import socket from '../../../helpers/socket';
import { SOCKET_EVENTS } from '../../../constants/socket.constants';
import { eventTypes } from '../../../constants/event-types';
import { MAX_CHAT_INPUT_LENGTH } from '../../../constants/chat.constants';
import { MessageInterface } from '../../../interfaces/chat.interfaces';

const StyledChat = styled.div`
  padding: 20px 10px;
  width: 100%;
  height: 100%;
  max-width: 700px;
  max-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  font-size: ${props => props.theme.fontSizes[1]};
`;

const StyledMessageInput = styled.div`
  width: 100%;
  display: flex;
`;

const Chat = () => {
  const [message, setMessage] = useState<string>('');
  const { token } = useContext(AuthContext);
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscribeToMessages = (newMessages: MessageInterface | MessageInterface[]) => dispatch(addMessages(newMessages));
    socket.on(SOCKET_EVENTS.SEND_MESSAGE, subscribeToMessages);
    return () => {
      socket.off(SOCKET_EVENTS.SEND_MESSAGE, subscribeToMessages);
    };
  }, [dispatch]);

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(target.value);
  };

  const handleSendMessage = () => {
    if (token && message.trim().length) {
      setMessage('');
      dispatch(sendMessage(socket, { token, message }));
    }
  };
  const handleMessageKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === eventTypes.Enter) {
      handleSendMessage();
    }
  };

  return (
    <StyledChat>
      <Messages messages={messages} />
      <StyledMessageInput>
        <Textarea
          id="send-message"
          name="message"
          value={message}
          onKeyUp={handleMessageKeyUp}
          onChange={handleInputChange}
          maxLength={MAX_CHAT_INPUT_LENGTH}
          placeholder="Введите сообщение"
        />
        <Button onClick={handleSendMessage}>{'>'}</Button>
      </StyledMessageInput>
    </StyledChat>
  );
};

export default Chat;
