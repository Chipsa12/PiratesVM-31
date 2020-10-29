import React from 'react';
import styled from 'styled-components';
import { TeamListInterface } from '../../../interfaces/team.interfaces';

const StyledTeam = styled.div<{ isSelected: boolean }>`
  margin: 4px 6px;
  padding: 5px 10px;
  text-transform: uppercase;
  color: ${props => props.isSelected ? props.theme.colors.secondary : props.theme.colors.text};
  background: ${props => props.isSelected && props.theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes[2]};
`;

const StyledTeamName = styled.span`
  min-width: 70%;
  display: inline-flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
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
  </StyledTeam>
);

export default Team;
