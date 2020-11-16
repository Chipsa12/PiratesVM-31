import React from 'react';
import styled from 'styled-components';
import CSS from 'csstype';

const StyledTextarea = styled.textarea`
  width: 100%;
  font-size: ${props => props.theme.fontSizes[0]};
  padding: 4px 8px;
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.accent};
  background: transparent;
  outline: none;
  
  &::placeholder {
    font-size: ${props => props.theme.fontSizes[0]};
    color: ${({ theme }) => theme.colors.text};
  }
  
  &::-webkit-scrollbar {
    width: ${({ theme: { scrollbar } }) => scrollbar.width};
  }
  
  &::-webkit-scrollbar-track {
    background-color: ${({ theme: { scrollbar }  }) => scrollbar.bg};
    border-radius: ${({ theme: { scrollbar }  }) => scrollbar.borderRadius};
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme: { scrollbar }  }) => scrollbar.thumbBg};
    border-radius: ${({ theme: { scrollbar }  }) => scrollbar.borderRadius};
    border: 1px solid ${({ theme: { scrollbar }  }) => scrollbar.bg};
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
