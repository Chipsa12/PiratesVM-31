import React from 'react';
import styled from 'styled-components';
import bannerImage from '../../assets/banner.png';

const StyledBanner = styled.div`
  position: absolute;
  width: 100%;
  height: 130px;
  top: -140px;
  background: url(${bannerImage}) center no-repeat;
  background-size: contain;
`;

const Banner = () => (
  <div style={{ position: 'relative' }}>
    <StyledBanner />
  </div>
);

export default Banner;
