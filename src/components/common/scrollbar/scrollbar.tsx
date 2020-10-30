import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

const ScrollHostContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const ScrollHost = styled.div`
  position: relative;
  height: 100%;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledScrollBar = styled.div`
  position: absolute;
  right: -8px;
  top: 0;
  bottom: 0;
  width: ${({ theme: { scrollbar } }) => scrollbar.width};
  height: 100%;
  border-radius: ${({ theme: { scrollbar } }) => scrollbar.borderRadius};
  background-color: ${({ theme: { scrollbar } }) => scrollbar.bg};
`;

const ScrollThumb = styled.div`
  position: absolute;
  top: 0;
  margin-left: 1px;
  width: ${({ theme: { scrollbar } }) => scrollbar.thumbWidth};
  height: 20px;
  border-radius: ${({ theme: { scrollbar } }) => scrollbar.borderRadius};
  background-color: ${({ theme: { scrollbar } }) => scrollbar.thumbBg};
`;

interface ScrollbarProps {
  children: React.ReactNode;
  scrollToBottom?: boolean;
}

const SCROLL_BOX_MIN_HEIGHT = 20;

const Scrollbar: React.FC<ScrollbarProps> = ({
  children,
  scrollToBottom = true,
}) => {
  const scrollHostRef = useRef<HTMLDivElement>(null);
  const [scrollBoxHeight, setScrollBoxHeight] = useState(SCROLL_BOX_MIN_HEIGHT);
  const [scrollBoxTop, setScrollBoxTop] = useState(0);
  const [lastScrollThumbPosition, setScrollThumbPosition] = useState(0);
  const [isDragging, setDragging] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollToBottom) {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [children, scrollToBottom]);

  const handleDocumentMouseUp = useCallback((event: MouseEvent) => {
    if (isDragging) {
      event.preventDefault();
      setDragging(false);
    }
  }, [isDragging]);

  const handleDocumentMouseMove = useCallback((event: MouseEvent) => {
    if (isDragging && scrollHostRef.current) {
      event.preventDefault();
      event.stopPropagation();
      const scrollHostElement = scrollHostRef.current;
      const { scrollHeight, offsetHeight } = scrollHostElement;

      const deltaY = event.clientY - lastScrollThumbPosition;
      const percentage = deltaY * (scrollHeight / offsetHeight);

      setScrollThumbPosition(event.clientY);
      setScrollBoxTop(
        Math.min(
          Math.max(0, scrollBoxTop + deltaY),
          offsetHeight - scrollBoxHeight,
        ),
      );
      scrollHostElement.scrollTop = Math.min(
        scrollHostElement.scrollTop + percentage,
        scrollHeight - offsetHeight,
      );
    }
  }, [isDragging, lastScrollThumbPosition, scrollBoxHeight, scrollBoxTop]);

  const handleScrollThumbMouseDown = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setScrollThumbPosition(event.clientY);
    setDragging(true);
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollHostRef && scrollHostRef.current) {
      const { scrollTop, scrollHeight, offsetHeight } = scrollHostRef.current;

      let newTop = (scrollTop / scrollHeight) * offsetHeight;
      newTop = Math.min(newTop, offsetHeight - scrollBoxHeight);
      setScrollBoxTop(newTop);
    }
  }, [scrollBoxHeight]);

  useEffect(() => {
    const scrollHostElement = scrollHostRef.current;
    if (scrollHostElement) {
      const { clientHeight, scrollHeight } = scrollHostElement;
      const scrollThumbPercentage = clientHeight / scrollHeight;
      const scrollThumbHeight = Math.max(
        scrollThumbPercentage * clientHeight,
        SCROLL_BOX_MIN_HEIGHT,
      );
      setScrollBoxHeight(scrollThumbHeight);
      scrollHostElement.addEventListener('scroll', handleScroll, true);
      return () => {
        scrollHostElement.removeEventListener('scroll', handleScroll, true);
      };
    }
    return undefined;
  }, [children, handleScroll]);

  useEffect(() => {
    document.addEventListener('mousemove', handleDocumentMouseMove);
    document.addEventListener('mouseup', handleDocumentMouseUp);
    document.addEventListener('mouseleave', handleDocumentMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
      document.removeEventListener('mouseleave', handleDocumentMouseUp);
    };
  }, [handleDocumentMouseMove, handleDocumentMouseUp]);

  return (
    <ScrollHostContainer>
      <ScrollHost ref={scrollHostRef}>
        {children}
        <div ref={messagesEndRef} />
      </ScrollHost>
      <StyledScrollBar>
        <ScrollThumb
          style={{ height: scrollBoxHeight, top: scrollBoxTop }}
          onMouseDown={handleScrollThumbMouseDown}
        />
      </StyledScrollBar>
    </ScrollHostContainer>
  );
};

export default Scrollbar;
