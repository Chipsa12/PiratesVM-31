import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container } from '../authorization';
import { StyledWrapper } from '../create-team/create-team';
import { selectJoinedTeam } from '../../redux/selectors/team.selectors';
import { JoinedTeamInterface } from '../../interfaces/team.interfaces';
import Title from '../common/title';
import TeamRoomSettings from './team-room-settings';
import Button from '../common/button';
import Chat from '../common/chat';
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
    <Container>
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
    </Container>
  );
};

export default TeamRoom;
