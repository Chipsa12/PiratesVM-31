import { ADD_MESSAGES } from '../../constants/action-types.constants';
import { MessagesInterface } from '../../interfaces/chat.interfaces';

const CHAT_INITIAL_STATE: ChatStateInterface = {
  messages: [],
};

export interface ChatStateInterface extends MessagesInterface {
}

export default (state = CHAT_INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      };
    default:
      return state;
  }
};
