import * as actions from '../../constants/action-types.constants';

export const updateGame = (game) => ({
  type: actions.UPDATE_GAME,
  payload: game,
});
