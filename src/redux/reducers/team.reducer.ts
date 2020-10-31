import * as actions from '../../constants/action-types.constants';
import { JoinedTeamInterface, TeamListInterface } from '../../interfaces/team.interfaces';

export interface TeamReducerInterface {
  teams: TeamListInterface[];
  joinedTeam: JoinedTeamInterface | null;
}

const INITIAL_VALUE: TeamReducerInterface = {
  teams: [],
  joinedTeam: null,
};

export default (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case actions.ADD_TEAMS:
      return {
        ...state,
        teams: [ ...state.teams, ...action.payload ],
      };
    case actions.LEAVE_TEAM:
      return {
        ...state,
        joinedTeam: null,
      };
    case actions.JOIN_TEAM:
      return {
        ...state,
        joinedTeam: action.payload,
      };
    case actions.CREATE_TEAM:
      return {
        ...state,
        joinedTeam: action.payload,
      };
    default:
      return state;
  }
};
