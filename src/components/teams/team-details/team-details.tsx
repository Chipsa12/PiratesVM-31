import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Input from '../../input';
import Button from '../../button';
import { joinTeam } from '../../../redux/actions/team.actions';
import socket from '../../../helpers/socket';
import { SOCKET_EVENTS } from '../../../constants/socket.constants';
import AuthContext from '../../../contexts/auth.context';
import { TeamListInterface } from '../../../interfaces/team.interfaces';
import { TEAM_ROOM_URL } from '../../../constants/url.constants';

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: start;
  align-items: center;
  flex-basis: 100%;
  width: 100%;
  
  color: ${({ theme: { colors }}) => colors.light};
  font-size: ${(props) => props.theme.fontSizes[1]};
  text-transform: uppercase;
`;

const StyledTeamDetails = styled.div`
  padding: 10px 30px;
  margin: 0 10px 10px 0;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme: { colors }}) => colors.text};
`;

const StyledHeader = styled.div`
  margin: 10px 10px 5px;
  font-size: ${(props) => props.theme.fontSizes[1]};
  color: ${(props) => props.theme.colors.light};
  text-transform: uppercase;
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

export const StyledTitle = styled.span`
  color: ${props => props.theme.colors.greys[0]}
`;

export const StyledDetailPlayers = styled.span`
  margin: 5px 0;
  display: flex;
  flex-flow: column;
  align-items: center;
  color: ${props => props.theme.colors.light}
`;

const StyledControls = styled.div`
  width: 100%;
`;

const StyledInput = styled(Input)`
  text-align: center;
  height: 40px;

  &::placeholder {
    font-size: ${props => props.theme.fontSizes[1]};
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 40px;
  font-size: ${props => props.theme.fontSizes[1]};
  box-shadow: 0 4px 0 ${props => props.theme.colors.blacks[0]};
  background: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.primary};
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
      <StyledHeader>Описание</StyledHeader>
      {details &&
      <StyledTeamDetails>
        <StyledDetails>
          <StyledTitle>Комната:</StyledTitle>
          <p>{details.name}</p>
          <StyledDetail>
            <StyledTitle>Организатор:</StyledTitle>
            <span>{details.ownerName}</span>
          </StyledDetail>
          <StyledDetail>
          <StyledTitle>Игроки:</StyledTitle>
            <StyledDetailPlayers>
              {details.playersCount}/{details.maxPlayers}
            </StyledDetailPlayers>
          </StyledDetail>
        </StyledDetails>
        <StyledControls>
          {details.isPrivate && (
            <StyledInput
              id="team-code"
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
