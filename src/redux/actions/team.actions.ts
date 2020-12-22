import * as actions from '../../constants/action-types.constants';
import { TeamReducerInterface } from '../reducers/team.reducer';
import { JoinedTeamInterface } from '../../interfaces/team.interfaces';

export const updateTeams = (teams: TeamReducerInterface['teams']) => (dispatch) => dispatch({
  type: actions.UPDATE_TEAMS,
  payload: teams,
});

export const leaveTeam = () => (dispatch) => dispatch({
  type: actions.LEAVE_TEAM,
});

export const joinTeam = (team: JoinedTeamInterface) => (dispatch) => dispatch({
  type: actions.JOIN_TEAM,
  payload: team,
});

export const createTeam = (team) => (dispatch) => dispatch({
  type: actions.CREATE_TEAM,
  payload: team,
});
