import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Scrollbar from '../scrollbar';
import Team from './team';
import TeamDetails from './team-details';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTeams } from '../../redux/selectors/team.selectors';
import { updateTeams } from '../../redux/actions/team.actions';
import socket from '../../helpers/socket';
import Button from '../button/button';
import { SOCKET_EVENTS } from '../../constants/socket.constants';
import CreateTeam from '../create-team';

const StyledWrapper = styled.div`
  margin: 20px 30px;
  background: ${(({ theme }) => theme.colors.secondary)};
`;

const StyledTitle = styled.div`
  margin: 10px 10px 5px;
  font-size: ${(props) => props.theme.fontSizes[1]};
  color: ${(props) => props.theme.colors.light};
  text-transform: uppercase;
`;

const StyledTeamsContainer = styled.div`
  min-height: 438px;
  max-height: 438px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid ${({ theme: { colors } }) => colors.text};
`;

const StyledTeams = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  width: 1000px;
`;

const TeamsHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledButton = styled(Button)`
  width: 142px;
  height: 23px;
  font-size: ${props => props.theme.fontSizes[0]};
  box-shadow: 0 4px 0 ${props => props.theme.colors.blacks[0]};
  background: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.text_accent};
    border: 1px solid;
  }
`;

const Teams = (): React.ReactElement => {
  const teams = useSelector(selectAllTeams);
  const [selectedTeamId, setSelectedTeamId] = useState<number>(teams[0]?.teamId);
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTeams = (newTeams): any => dispatch(updateTeams(newTeams));

    socket.on(SOCKET_EVENTS.TEAM_LIST, getTeams);

    return () => {
      socket.off(SOCKET_EVENTS.TEAM_LIST, getTeams);
    };
  }, [dispatch]);

  const handleCreateRoom = (): void => {
    setIsOpen(true);
  };

  return (
    <StyledWrapper>
      <StyledTeamsContainer>
        <StyledTeams>
          <TeamsHeader>
            <StyledTitle>Комнаты</StyledTitle>
            <StyledButton onClick={handleCreateRoom}>Создать</StyledButton>
          </TeamsHeader>
          <Scrollbar>
            {teams.map(({ name, teamId, isPrivate }) => (
              <Team
                key={teamId}
                name={name}
                isSelected={teamId === selectedTeamId}
                isPrivate={isPrivate}
                onClick={() => setSelectedTeamId(teamId)}
              />
            ))}
          </Scrollbar>
        </StyledTeams>
        <TeamDetails details={teams.find(({ teamId }) => teamId === selectedTeamId) || teams[0]} />
      </StyledTeamsContainer>
      <CreateTeam modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}/>
    </StyledWrapper>
  );
};

export default Teams;
