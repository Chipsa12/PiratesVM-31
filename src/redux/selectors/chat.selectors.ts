import { RootState } from '../store';
import { MessageInterface } from '../../interfaces/chat.interfaces';
import { ChatStateInterface } from '../reducers/chat.reducer';

export const selectChat = ({ chat }: RootState): ChatStateInterface => chat;
export const selectMessages = ({ chat }: RootState): MessageInterface[] => chat.messages;
