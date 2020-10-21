import React from 'react';
import styled from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';

const StyledLink = styled(LinkRouter)`
  margin: 10px 0;
  padding: 20px 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${(({ theme: { colors } }) => colors.transparent)};
  border-radius: 10px;
  border: 1px solid ${({ theme: { colors }}) => colors.text};
  color: ${({ theme: { colors }}) => colors.text};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes[3]};
  
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
}

const Link: React.FC<LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  href,
  ...attrs
}) => (
  <StyledLink to={href} {...attrs}>
    {children}
  </StyledLink>
);

export default Link;
