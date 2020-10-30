import React, { useContext } from 'react';
import styled from 'styled-components';
import Banner from '../common/banner';
import Link from '../common/link/link';
import { Container } from '../authorization';
import { AUTH_URL, CREATE_TEAM_URL, LOBBY_URL } from '../../constants/url.constants';
import AuthContext from '../../contexts/auth.context';

const StyledWrapper = styled.div`
  padding: 174px 0 140px;
  width: 377px;
  display: flex;
  flex-flow: column;
  background: ${({ theme: { colors }}) => colors.primary};
  border-radius: 22px;
`;

const StyledBannerContainer = styled.div`
  position: relative;
`;

const StyledBanner = styled.div`
  position: absolute;
  top: -262px;
  left: -33.5px;
  width: 444px;
`;

const StyledMenu = styled.nav.attrs(() => ({
  role: 'navigation',
}))`
  display: flex;
  flex-flow: column;
`;

const StyledLink = styled(Link)`  
  &:hover,
  &:focus {
    position: relative;
    width: 104%;
    left: -2%;
  }
`;

const Menu = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Container>
      <StyledWrapper>
        <StyledBannerContainer>
          <StyledBanner>
            <Banner height="222px" />
          </StyledBanner>
        </StyledBannerContainer>
        <StyledMenu>
          <StyledLink href={CREATE_TEAM_URL}>Создать игру</StyledLink>
          <StyledLink href={LOBBY_URL}>Найти игру</StyledLink>
          <StyledLink href={AUTH_URL} onClick={logout}>Выйти</StyledLink>
        </StyledMenu>
      </StyledWrapper>
    </Container>
  );
};

export default Menu;
