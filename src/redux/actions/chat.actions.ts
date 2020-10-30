import * as actions from '../../constants/action-types.constants';
import { SOCKET_EVENTS } from '../../constants/socket.constants';
import { MessageInterface } from '../../interfaces/chat.interfaces';

export const addMessages = (messages: MessageInterface | MessageInterface[]) => (dispatch) => dispatch({
  type: actions.ADD_MESSAGES,
  payload: messages instanceof Array ? messages : [messages],
});

export const sendMessage = (socket: SocketIOClient.Socket, data: { token: string, message: string }) => () => {
  socket.emit(SOCKET_EVENTS.SEND_MESSAGE, data);
};
