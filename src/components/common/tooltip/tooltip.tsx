import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const StyledTooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledTooltip = styled.span`
  position: absolute;
  padding: 10px;
  border-radius: 3px;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.accent};
  width: 300px;
  font-size: 1.7rem;
  z-index: 9999;
`;

const StyledTooltipTop = styled(StyledTooltip)`
  bottom: 115%;
  transform: translateX(-50%);
  left: 50%;
`;

const StyledTooltipRight = styled(StyledTooltip)`
  left: 115%;
  transform: translateY(-50%);
  top: 50%;
`;

const StyledTooltipBottom = styled(StyledTooltip)`
  top: 115%;
  transform: translateX(-50%);
  left: 50%;
`;

const StyledTooltipLeft = styled(StyledTooltip)`
  right: 115%;
  transform: translateY(-50%);
  top: 50%;
`;

const StyledTooltipTarget = styled.span`
  cursor: pointer;
`;

export interface TooltipProps {
  children: React.ReactNode;
  content?: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  styles?: React.CSSProperties;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content = 'Tooltip content',
  position = 'right',
  styles,
}) => {
  const [visible, setVisible] = useState(false);

  const getTag = useCallback(() => {
    switch (position) {
      case 'right':
        return StyledTooltipRight;
      case 'bottom':
        return StyledTooltipBottom;
      case 'left':
        return StyledTooltipLeft;
      case 'top':
      default:
        return StyledTooltipTop;
    }
  }, [position]);

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  const Tag = getTag();

  return (
    <StyledTooltipWrapper>
      {visible && <Tag style={styles}>{content}</Tag>}
      <StyledTooltipTarget
        className="targetElement"
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        {children}
      </StyledTooltipTarget>
    </StyledTooltipWrapper>
  );
}

export default Tooltip;
