import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../button';
import Textarea from '../textarea';
import Messages from '../messages';
import AuthContext from '../../contexts/auth.context';
import { addMessages, sendMessage } from '../../redux/actions/chat.actions';
import { selectMessages } from '../../redux/selectors/chat.selectors';
import socket from '../../helpers/socket';
import { SOCKET_EVENTS } from '../../constants/socket.constants';
import { eventTypes } from '../../constants/event-types';
import { MAX_CHAT_INPUT_LENGTH } from '../../constants/chat.constants';
import { MessageInterface } from '../../interfaces/chat.interfaces';
import OnlineUsers from '../online-users/online-users';

const Container = styled.div`
  margin: 20px 30px;
  width: 733px;
  height: 100%;
  max-height: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledChat = styled.div`
  width: 540px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  font-size: ${props => props.theme.fontSizes[1]};
  background: ${(({ theme }) => theme.colors.secondary)};
  border: 1px solid ${({ theme: { colors }}) => colors.text};
`;

const ChatHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-wrap: wrap;
  padding: 6px 0;
  border-bottom: 1px solid ${({ theme: { colors }}) => colors.text};
`;

const ChatRoomTab = styled.div`
  color: ${props => props.theme.colors.secondary};
  background-color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes[0]};
  border-radius: 8px;
  padding: 2px 4px;
  margin: 0 10px;
`;

const StyledMessageInput = styled.div`
  width: 100%;
  display: flex;
  border-top: 1px solid ${({ theme: { colors }}) => colors.text};
`;

const StyledButton = styled(Button)`
  background: none;
  color: ${props => props.theme.colors.text};

  &:focus {
    border: none;
  }
`;

const Chat = () => {
  const [message, setMessage] = useState<string>('');
  const { userDetails: { token } } = useContext(AuthContext);
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
    <Container>
      <StyledChat>
        <ChatHeader>
          <ChatRoomTab>Общий</ChatRoomTab>
        </ChatHeader>
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
          <StyledButton onClick={handleSendMessage}>{'>'}</StyledButton>
        </StyledMessageInput>
      </StyledChat>
      <OnlineUsers></OnlineUsers>
    </Container>
  );
};

export default Chat;
