import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from '../authorization';
import styled from 'styled-components';
import Input from '../common/input';
import socket from '../../helpers/socket';
import { SOCKET_EVENTS } from '../../constants/socket.constants';
import AuthContext from '../../contexts/auth.context';
import Link from '../common/link';
import { LOBBY_URL, TEAM_ROOM_URL } from '../../constants/url.constants';
import Title from '../common/title';
import * as constants from '../../constants/team.constants';
import { useDispatch } from 'react-redux';
import { createTeam } from '../../redux/actions/team.actions';

export const StyledWrapper = styled.div`
  padding: 2px 4px;
  display: flex;
  flex-flow: column;
  align-items: center;
  max-width: 494px;
  width: 100%;
  background: ${({ theme: { colors }}) => colors.primary};
  user-select: none;
`;

const StyledCreateTeam = styled.div`
  padding: 32px 18px 58px;
  display: flex;
  flex-flow: column;
  align-items: center;
  font-size: ${props => props.theme.fontSizes[3]};
`;

const StyledRoomName = styled(Input)`
  text-align: center;
  width: 100%;
`;

const StyledTeamPrivateContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-flow: row-reverse;
  padding: 10px;
`;

const StyledMinPlayersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface CreateTeamFormInterface {
  name: string;
  isPrivate: boolean;
  minPlayers: number;
}

const CreateTeam = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);
  const history = useHistory();
  const [form, setForm] = useState<CreateTeamFormInterface>({
    name: '',
    isPrivate: false,
    minPlayers: constants.MIN_TEAM_PLAYERS,
  });

  const handleCreateTeam = (): void => {
    socket.emit(SOCKET_EVENTS.CREATE_TEAM, { token, ...form });
    socket.once(SOCKET_EVENTS.CREATE_TEAM, (team) => {
      if (team) {
        dispatch(createTeam(team));
        history.push(TEAM_ROOM_URL);
      } else {
        console.log('Room is not created!')
      }
    });
  };

  const handleRoomNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({
      ...form,
      name: event.target.value,
    });
  };

  const handleMinPlayersChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({
      ...form,
      minPlayers: +event.target.value,
    });
  };

  const handlePrivateGameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({
      ...form,
      isPrivate: event.target.checked,
    });
  };

  return (
    <Container>
      <StyledWrapper>
        <Title title="Создать игру" />
        <StyledCreateTeam>
          <StyledRoomName
            id="room-name"
            placeholder="Название комнаты"
            autoFocus
            autoComplete="off"
            onChange={handleRoomNameChange}
            maxLength={constants.MAX_ROOM_NAME_LENGTH}
          />
          <StyledTeamPrivateContainer>
            <Input
              id="room-private"
              name="isPrivate"
              type="checkbox"
              label="Приватная игра"
              onChange={handlePrivateGameChange}
            />
          </StyledTeamPrivateContainer>
          <StyledMinPlayersContainer>
            <Input
              id="room-min-players"
              type="range"
              label="Мин. игроков"
              min={constants.MIN_TEAM_PLAYERS}
              max={constants.MAX_TEAM_PLAYERS}
              value={form.minPlayers}
              onChange={handleMinPlayersChange}
            />
            <span>{form.minPlayers}</span>
          </StyledMinPlayersContainer>
          <Link href={LOBBY_URL} active onClick={handleCreateTeam}>Создать</Link>
        </StyledCreateTeam>
      </StyledWrapper>
    </Container>
  );
};

export default CreateTeam;
