import React from 'react';
import styled, { CSSProperties } from 'styled-components';

const bannerImage = require('../../assets/banner.png');

const StyledContainer = styled.div<BannerProps>`
  position: relative;
  top: -40px;
  height: ${props => props.height};
`;

const StyledBanner = styled.div`
  width: 100%;
  height: 100%;
  background: url(${bannerImage}) center no-repeat;
  background-size: contain;
`;

interface BannerProps {
  height?: CSSProperties['height'];
}

const Banner: React.FC<BannerProps> = ({
  height = '187px',
}) => (
  <StyledContainer height={height}>
    <StyledBanner />
  </StyledContainer>
);

export default Banner;
