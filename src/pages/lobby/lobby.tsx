import React, {useContext} from 'react';
import styled from 'styled-components';
import Chat from '../../components/chat';
import Title from '../../components/title';
import Teams from '../../components/teams';
import CloseSVG from '../../icons/closeSVG';
import AuthContext from '../../contexts/auth.context';
import Button from '../../components/button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 801px;
  height: 856px;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 49px;
  width: 100%;
  background: #0C3431;
`;

const HeaderLeft = styled.div`
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const Text = styled.span`
  margin-left: 10px;
  font-size: ${(style) => style.theme.fontSizes[0]};
  color: ${(style) => style.theme.colors.light} ;
`;

const Content = styled.div`
  padding: 2px 4px 20px;
  height: 807px;
  background: linear-gradient(#13514D, #156F68, #13514D);
`;

const Lobby = () => { 
  const { logout } = useContext(AuthContext); 

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Button onClick={logout}>
            <CloseSVG/>
          </Button>
          <Text>Masha</Text>
        </HeaderLeft>
        <Title title="Найти игру"/>
      </Header>
      <Content>
        <Teams />
        <Chat/>
      </Content>
    </Container>
  )
};

export default Lobby;
