import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Input from '../../input';
import Button from '../../button';
import { MAX_TEAM_PLAYERS, MIN_TEAM_PLAYERS } from '../../../constants/team.constants';
import { joinTeam } from '../../../redux/actions/team.actions';
import socket from '../../../helpers/socket';
import { SOCKET_EVENTS } from '../../../constants/socket.constants';
import AuthContext from '../../../contexts/auth.context';
import { TeamListInterface } from '../../../interfaces/team.interfaces';
import { TEAM_ROOM_URL } from '../../../constants/url.constants';

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  flex-basis: 100%;
  width: 100%;
  border: 1px solid ${({ theme: { colors }}) => colors.text};
  color: ${({ theme: { colors }}) => colors.text};
  font-size: ${(props) => props.theme.fontSizes[1]};
  text-transform: uppercase;
`;

const StyledTeamDetails = styled.div`
  padding: 10px 30px;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
`;

const StyledDetails = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const StyledDetail = styled.div`
  margin: 5px 0;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const StyledDetailPlayers = styled.span<{ players: number; minPlayers: number; }>`
  margin: 5px 0;
  display: flex;
  flex-flow: column;
  align-items: center;
  color: ${props => props.players <= props.minPlayers ? props.theme.colors.reds[1] : props.theme.colors.greens[1]}
`;

const StyledControls = styled.div`
  width: 100%;
`;

const StyledInput = styled(Input)`
  text-align: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

export interface TeamDetailsProps {
  details: TeamListInterface | null;
}

const TeamDetails: React.FC<TeamDetailsProps> = ({
  details,
}): React.ReactElement => {
  const { userDetails: { token } } = useContext(AuthContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const [password, setPassword] = useState<string>('');

  const handleJoinTeam = () => {
    if (details) {
      socket.emit(SOCKET_EVENTS.JOIN_TO_TEAM, { token, teamId: details.teamId, password });
      socket.once(SOCKET_EVENTS.JOIN_TO_TEAM, (data) => {
        if (data) {
          dispatch(joinTeam(data));
          history.push(TEAM_ROOM_URL);
        } else {
          console.log('Error to join team: ', data)
        }
      });
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <StyledWrapper>
      {details &&
      <StyledTeamDetails>
        <StyledDetails>
          <p>{details.name}</p>
          <StyledDetail>
            Организатор:
            <span>{details.ownerName}</span>
          </StyledDetail>
          <StyledDetail>
            Игроки:
            <StyledDetailPlayers players={details.players} minPlayers={details.minPlayers || MIN_TEAM_PLAYERS}>
              {details.players}/{MAX_TEAM_PLAYERS}
            </StyledDetailPlayers>
          </StyledDetail>
          <StyledDetail>
            Статус:
            <span>{details?.isPlaying ? 'В игре' : 'Ожидание'}</span>
          </StyledDetail>
        </StyledDetails>
        <StyledControls>
          {details.isPrivate && (
            <StyledInput
              id="team-code"
              label="Пароль"
              placeholder="Пароль"
              value={password}
              onChange={handlePasswordChange}
            />
          )}
          <StyledButton onClick={handleJoinTeam}>Войти</StyledButton>
        </StyledControls>
      </StyledTeamDetails>
      }
    </StyledWrapper>
  );
};

export default TeamDetails;
