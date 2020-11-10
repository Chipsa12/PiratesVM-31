import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Scrollbar from "../scrollbar/scrollbar";

interface User {
  id: string;
  name: string;
}

const Container = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  background-color: ${(style) => style.theme.colors.secondary} ;
  width: 200px;
  height: 100%;
  border: 1px solid ${({ theme: { colors }}) => colors.text};
`;

const Wrapper = styled.div`
  width: 100%;
  height: 85%;
`;

const Footer = styled.div`
  font-family: ${(style) => style.theme.fonts.Roboto};
  font-size: ${(style) => style.theme.fontSizes[5]}; 
  color: ${(style) => style.theme.colors.light} ;  
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${({ theme: { colors }}) => colors.text};
  font-size: ${(style) => style.theme.fontSizes[1]};
`;

const StyledUser = styled.div`
  padding: 10px 10px;
`;

const StyledUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  font-family: ${(style) => style.theme.fonts.Roboto};
  font-size: ${(style) => style.theme.fontSizes[0]};
  color: ${(style) => style.theme.colors.light} ;
`;

const StyledLi = styled.li`
  :nth-child(2n+1) {
    background-color: rgba(255, 225, 144, 0.06);;
  }
`;

const OnlineUsers = () => {
  const onlineUsers = [
    {
      id: "1",
      name: "Vasya"
    },
    {
      id: "2",
      name: "Petya"
    },
    {
      id: "3",
      name: "Masha"
    },
    {
      id: "4",
      name: "Sasha"
    },
    {
      id: "5",
      name: "Petya"
    },
    {
      id: "6",
      name: "Vasya"
    },
  ]
  return (
    <Container>
      <Wrapper>
        <Scrollbar>
          <StyledUl>
            {
              onlineUsers.map((user: User) => {
                return <StyledLi key={user.id}>
                  <StyledUser>
                    {user.name}
                  </StyledUser>
                </StyledLi>
              })
            }
          </StyledUl>
        </Scrollbar>
      </Wrapper>
      <Footer>
        <span>Игроки</span>
      </Footer>
    </Container>
  );
};

export default OnlineUsers;