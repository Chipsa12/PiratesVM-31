import React from 'react';
import styled from 'styled-components';
import { JoinedTeamInterface } from '../../../interfaces/team.interfaces';
import { StyledDetail, StyledDetailPlayers } from '../../../components/teams/team-details';
import { core } from '../../../config/core';

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const StyledPasswordContainer = styled.div`
  display: inline-flex;
  flex-flow: column;
  align-items: center;
`;

const StyledPassword = styled.span`
  display: inline-flex;
  justify-content: center;
`;

const StyledSettings = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  background: ${props => props.theme.colors.secondary};
`;

export interface TeamRoomSettingsProps {
  team: JoinedTeamInterface | null;
}

const TeamRoomSettings: React.FC<TeamRoomSettingsProps> = ({
  team,
}): React.ReactElement => (
  <StyledWrapper>
    {team?.password && (
      <StyledPasswordContainer>
        Пароль:
        <StyledPassword>{team.password}</StyledPassword>
      </StyledPasswordContainer>)}
    <StyledSettings>
      <StyledDetail>
        <StyledDetailPlayers>
          {team?.players.length}/{team?.maxPlayers || core.MAX_ROOM_PLAYERS_DEFAULT}
        </StyledDetailPlayers>
      </StyledDetail>
      {team?.options?.speed && (
        <StyledDetail>
          Скорость:
          {team.options.speed}
        </StyledDetail>)}
      {team?.options?.messageDistance && (
        <StyledDetail>
          Дальность передачи сообщений:
          {team.options.messageDistance}
        </StyledDetail>)}
      {team?.options?.quests && (
        <>
          <StyledDetail>
            Обычных заданий:
            {team.options.quests.easy}
          </StyledDetail>
          <StyledDetail>
            Легких заданий:
            {team.options.quests.normal}
          </StyledDetail>
          <StyledDetail>
            Сложных заданий:
            {team.options.quests.hard}
          </StyledDetail>
        </>)}
    </StyledSettings>
  </StyledWrapper>
);

export default TeamRoomSettings;
