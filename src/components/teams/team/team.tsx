import React from 'react';
import styled from 'styled-components';
import PrivateSVG from '../../../icons/privateSVG';
import { TeamListInterface } from '../../../interfaces/team.interfaces';

const StyledTeam = styled.div<{ isSelected: boolean }>`
  margin: 4px 6px;
  padding: 5px 10px;
  text-transform: uppercase;
  color: ${props => props.isSelected ? props.theme.colors.secondary : props.theme.colors.text};
  background: ${props => props.isSelected ? props.theme.colors.text : 'linear-gradient(0.25turn, #1A837D, #164644)'};
  border-radius: 4px;
  font-size: ${(props) => props.theme.fontSizes[2]};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledTeamName = styled.span`
  min-width: 70%;
  display: inline-flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
`;

const TeamInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface TeamProps {
  name: TeamListInterface['name'];
  isPrivate?: TeamListInterface['isPrivate'];
  onClick: () => void;
  isSelected?: boolean;
}

const Team: React.FC<TeamProps> = ({
  name,
  isPrivate = false,
  onClick,
  isSelected = false,
}): React.ReactElement => (
  <StyledTeam onClick={onClick} isSelected={isSelected}>
    <StyledTeamName>
      {name}
    </StyledTeamName>
    <TeamInfo>
      {
        isPrivate && <PrivateSVG isSelected={isSelected} style={{ marginRight: 10 }}/>
      }
      0/0
    </TeamInfo>
  </StyledTeam>
);

export default Team;
