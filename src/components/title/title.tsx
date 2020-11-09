import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.div`

  font-size: ${({ theme }) => theme.fontSizes[4]};
  color: ${({ theme }) => theme.colors.light};
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
