import { RootState } from '../store';
import { TeamReducerInterface } from '../reducers/team.reducer';
import { JoinedTeamInterface } from '../../interfaces/team.interfaces';

export const selectAllTeams = ({ team }: RootState): TeamReducerInterface['teams'] => team.teams;
export const selectJoinedTeam = ({ team }: RootState): JoinedTeamInterface => team.joinedTeam;
