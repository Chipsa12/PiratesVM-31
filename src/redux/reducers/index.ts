import { combineReducers } from 'redux';
import chat from './chat.reducer';
import team from './team.reducer';

export default combineReducers({
  chat,
  team,
});
