import io from 'socket.io-client';
import { SOCKET_URL } from '../constants/socket.constants';

const socket = io(SOCKET_URL, {
  transports: ['websocket']
});

export default socket;
