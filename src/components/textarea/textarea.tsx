import React from 'react';
import styled from 'styled-components';
import CSS from 'csstype';

const StyledTextarea = styled.textarea`
  width: 100%;
  font-size: 2.2rem;
  padding: 20px 8px;
  color: ${({ theme }) => theme.fg};
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.bgActive};
  background: transparent;
  outline: none;
  
  &::placeholder {
    font-size: 2rem;
    color: ${({ theme }) => theme.fg};
  }
  
  &::-webkit-scrollbar {
    width: ${({ theme }) => theme.scrollbarWidth};
  }
  
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.scrollbarBg};
    border-radius: ${({ theme }) => theme.scrollbarBorderRadius};
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.scrollbarThumbBg};
    border-radius: ${({ theme }) => theme.scrollbarBorderRadius};
    border: 1px solid ${({ theme }) => theme.scrollbarBg};
  }
`;

export interface TextareaProps {
  id: string;
  label?: string;
  rows?: number;
  resize?: CSS.StandardLonghandProperties['resize'];
  autoComplete?: boolean;
}

const Textarea: React.FC<TextareaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  id,
  resize = undefined,
  rows = 1,
  autoComplete = false,
  ...attrs
}) => {
  const styles: CSS.Properties = {
    resize: resize || 'none',
  };

  return (
    <StyledTextarea
      id={id}
      rows={rows}
      style={styles}
      autoComplete={autoComplete ? 'on' : 'off'}
      {...attrs}
    />
  );
};

export default Textarea;
