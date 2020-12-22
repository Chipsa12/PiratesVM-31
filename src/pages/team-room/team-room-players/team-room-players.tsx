import React from 'react';
import { JoinedTeamInterface } from '../../../interfaces/team.interfaces';
import styled from 'styled-components';

export interface TeamRoomPlayersProps {
  players?: JoinedTeamInterface['players'];
}

const StyledWrapper = styled.div`
  background: ${props => props.theme.colors.secondary};
`;

const TeamRoomPlayers: React.FC<TeamRoomPlayersProps> = ({
  players,
}): React.ReactElement => {
  return (
    <StyledWrapper>
    </StyledWrapper>
  );
};

export default TeamRoomPlayers;
