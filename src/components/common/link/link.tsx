import React from 'react';
import styled from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';

const StyledLink = styled(LinkRouter)`
  margin: 10px 0;
  padding: 20px 10px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.active ? props.theme.colors.text : props.theme.colors.transparent};
  border-radius: 10px;
  border: 1px solid ${({ theme: { colors }}) => colors.text};
  color: ${(props) => props.active ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes[3]};
  text-transform: uppercase;
  box-sizing: border-box;
  
  &:hover,
  &:focus {
    color: ${({ theme: { colors }}) => colors.blacks[0]};
    background: ${(({ theme: { colors } }) => colors.text)};
    border: ${({ theme: { colors }}) => colors.transparent};
    outline: none;
  }
`;

interface LinkProps {
  children: React.ReactNode;
  href: string;
  active?: boolean;
}

const Link: React.FC<LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  href,
  active = false,
  ...attrs
}) => (
  <StyledLink active={active.toString()} to={href} {...attrs}>
    {children}
  </StyledLink>
);

export default Link;
