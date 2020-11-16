import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Input from '../input';
import socket from '../../helpers/socket';
import { SOCKET_EVENTS } from '../../constants/socket.constants';
import AuthContext from '../../contexts/auth.context';
import Link from '../link';
import { TEAM_ROOM_URL } from '../../constants/url.constants';
import Title from '../title';
import * as constants from '../../constants/team.constants';
import { useDispatch } from 'react-redux';
import { createTeam } from '../../redux/actions/team.actions';
import Button from '../button';
import BackSVG from '../../icons/backSVG';

export const StyledWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  max-width: 494px;
  width: 100%;
  user-select: none;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: linear-gradient(#0D2B29, #0C3632);  
  height: 60px;
`;

const StyledButton = styled(Button)`
  position: absolute;
  left: 0;
  background: none;

  &:focus {
    border: none;
  }
  
  &:hover {
    background: none;
  }
`;

const StyledCreateTeam = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  font-size: ${props => props.theme.fontSizes[3]};
  background: linear-gradient(#13544E, #168A80);
  width: 100%;
`;

const StyledRoomName = styled(Input)`
  margin-top: 20px;
  text-align: center;
  width: 80%;
  height: 50px;
`;

const StyledTeamPrivateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;
`;

const StyledMinPlayersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  width: 80%;
  height: 50px;
`;

const InputWrapper = styled.div`
  margin: 10px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(#10685B, #0E4A46); 
  width: 100%;
`;

interface CreateTeamFormInterface {
  name: string;
  isPrivate: boolean;
  minPlayers: number;
}

const modalStyles = {
  content: {
    position: 'relative',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    background: 'none',
    inset: 0,
    border: 'none',
  }
};

const CreateTeam = ({
  modalIsOpen, setIsOpen
}): React.ReactElement => {
  const dispatch = useDispatch();
  const { userDetails: { token } } = useContext(AuthContext);
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

  const handleBackButton = (): void => {
    setIsOpen(false);
  }

  return (
    <Modal 
      isOpen={modalIsOpen}
      style={modalStyles}
      onRequestClose={handleBackButton}
    >
      <StyledWrapper>
        <Header>
          <StyledButton onClick={handleBackButton}><BackSVG/></StyledButton>
          <Title title="Создать игру" />
        </Header>
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
            <InputWrapper>
              <Input
                id="room-private"
                name="isPrivate"
                type="checkbox"
                onChange={handlePrivateGameChange}
              /> 
            </InputWrapper>
            <Title title={'Приватная игра'}/>
          </StyledTeamPrivateContainer>
          <StyledMinPlayersContainer>
            <Input
              id="room-min-players"
              type="range"
              min={constants.MIN_TEAM_PLAYERS}
              max={constants.MAX_TEAM_PLAYERS}
              value={form.minPlayers}
              onChange={handleMinPlayersChange}
            />
            <span>{form.minPlayers}</span>
          </StyledMinPlayersContainer>
        </StyledCreateTeam>
        <Footer>
          <StyledLink href={TEAM_ROOM_URL} active onClick={handleCreateTeam}>Создать</StyledLink>
        </Footer>
      </StyledWrapper>
    </Modal>
  );
};

export default CreateTeam;
