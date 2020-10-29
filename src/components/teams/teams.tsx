import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Scrollbar from '../scrollbar';
import Team from './team';
import TeamDetails from './team-details';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTeams } from '../../redux/selectors/team.selectors';
import { addTeams } from '../../redux/actions/team.actions';
import socket from '../../helpers/socket';
import { SOCKET_EVENTS } from '../../constants/socket.constants';

const StyledWrapper = styled.div`
  padding: 7px;
`;

const StyledTitle = styled.div`
  margin: 10px 0 5px;
  font-size: ${(props) => props.theme.fontSizes[1]};
  color: ${(props) => props.theme.colors.text};
  text-transform: uppercase;
`;

const StyledTeamsContainer = styled.div`
  min-height: 438px;
  max-height: 438px;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledTeams = styled.div`
  margin-right: 20px;
  background: ${(({ theme }) => theme.colors.secondary)};
  display: flex;
  flex-basis: 100%;
`;

const Teams = (): React.ReactElement => {
  const teams = useSelector(selectAllTeams);
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    const getTeams = (newTeams): any => dispatch(addTeams(newTeams));
    socket.on(SOCKET_EVENTS.TEAM_LIST, getTeams);
    return () => {
      socket.off(SOCKET_EVENTS.TEAM_LIST, getTeams);
    };
  }, [dispatch]);

  return (
    <StyledWrapper>
      <StyledTitle>Комнаты</StyledTitle>
      <StyledTeamsContainer>
        <StyledTeams>
          <Scrollbar>
            {Object.entries(teams).map(([key, { name, teamId }]) => (
              <Team
                key={key}
                name={name}
                isSelected={teamId === selectedTeamId}
                onClick={() => setSelectedTeamId(teamId)}
              />
            ))}
          </Scrollbar>
        </StyledTeams>
        <TeamDetails details={teams[selectedTeamId] ? teams[selectedTeamId] : null} />
      </StyledTeamsContainer>
    </StyledWrapper>
  );
};

export default Teams;
