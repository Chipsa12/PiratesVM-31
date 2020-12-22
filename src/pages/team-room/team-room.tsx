import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { StyledWrapper } from '../../components/create-team/create-team';
import { selectJoinedTeam } from '../../redux/selectors/team.selectors';
import Title from '../../components/title';
import TeamRoomSettings from './team-room-settings';
import Button from '../../components/button';
import Chat from '../../components/chat';
import TeamRoomPlayers from './team-room-players';
import { useHistory } from 'react-router-dom';
import { GAME_URL } from '../../constants/url.constants';
import socket from '../../helpers/socket';
import { SOCKET_EVENTS } from '../../constants/socket.constants';
import AuthContext from '../../contexts/auth.context';
import { Content } from '../lobby/lobby';
import { updateGame } from '../../redux/actions/game.actions';

const StyledWrapperTeamRoom = styled(StyledWrapper)`
  max-width: 1080px;
  width: 100%;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
`;

const StyledGroupName = styled.div``;

const TeamRoom = (): React.ReactElement => {
  const joinedTeam = useSelector(selectJoinedTeam);
  const history = useHistory();
  const dispatch = useDispatch();
  const { userDetails: { token } } = useContext(AuthContext);
  const [readyToStart, setReadyToStart] = useState<boolean>(false);

  useEffect(() => {
    const startGame = (data) => {
      if (data) {
        console.log(`Game is started: Received result: ${data}`);
        dispatch(updateGame(data))
        history.push(GAME_URL);
      } else {
        console.error(`Game is not started: Received result: ${data}`);
      }
    }

    const setReadiness = (isReady) => setReadyToStart(!!isReady);

    socket.on(SOCKET_EVENTS.START_GAME, startGame);
    socket.on(SOCKET_EVENTS.READY_TO_START, setReadiness);

    return () => {
      socket.off(SOCKET_EVENTS.START_GAME, startGame);
      socket.off(SOCKET_EVENTS.READY_TO_START, setReadiness);
    };
  }, [history]);

  const handleReadyToStart = () => {
    socket.emit(SOCKET_EVENTS.READY_TO_START, { token });
  };

  return (
    <StyledWrapperTeamRoom>
      <Title title="КОМНАТА" />
      <Content>
        <StyledContainer>
          <StyledGroupName>
            Группа:
            {joinedTeam?.name}
          </StyledGroupName>
          <TeamRoomPlayers players={joinedTeam?.players} />
          <Chat showOnlineUsers={false} />
        </StyledContainer>
        <StyledContainer>
          <TeamRoomSettings team={joinedTeam} />
          <Button onClick={handleReadyToStart}>{readyToStart ? 'Не готов' : 'Готов'}</Button>
        </StyledContainer>
      </Content>
    </StyledWrapperTeamRoom>
  );
};

export default TeamRoom;
