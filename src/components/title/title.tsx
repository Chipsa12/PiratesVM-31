import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.div`
  margin: 2px 4px;
  padding: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes[4]};
  background: #333;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
`;

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({
  title,
}): React.ReactElement => (
  <StyledTitle>
    {title}
  </StyledTitle>
);

export default Title;
