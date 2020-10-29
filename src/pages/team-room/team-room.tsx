import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { StyledWrapper } from '../create-team/create-team';
import { selectJoinedTeam } from '../../redux/selectors/team.selectors';
import { JoinedTeamInterface } from '../../interfaces/team.interfaces';
import Title from '../../components/title';
import TeamRoomSettings from './team-room-settings';
import Button from '../../components/button';
import Chat from '../../components/chat';
import TeamRoomPlayers from './team-room-players';

const StyledWrapperTeamRoom = styled(StyledWrapper)`
  max-width: 1080px;
  width: 100%;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const StyledGroupName = styled.div``;

const TeamRoom = (): React.ReactElement => {
  const joinedTeam: JoinedTeamInterface = useSelector(selectJoinedTeam);

  const handleReady = () => {};

  return (
    <StyledWrapperTeamRoom>
      <Title title="КОМНАТА" />
      <StyledContainer>
        <StyledGroupName>
          Группа:
          {joinedTeam.name}
        </StyledGroupName>
        <TeamRoomPlayers players={joinedTeam.players} />
        <Chat />
      </StyledContainer>
      <StyledContainer>
        <TeamRoomSettings team={joinedTeam} />
        <Button onClick={handleReady}>Готов</Button>
      </StyledContainer>
    </StyledWrapperTeamRoom>
  );
};

export default TeamRoom;
