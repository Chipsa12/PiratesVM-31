import { combineReducers } from 'redux';
import chat from './chat.reducer';
import team from './team.reducer';
import game from './game.reducer';

export default combineReducers({
  chat,
  team,
  game,
});
