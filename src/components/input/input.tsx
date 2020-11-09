import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  text-transform: uppercase;
  cursor: pointer;
`;

const StyledInput = styled.input`
  font-size: ${({ theme }) => theme.fontSizes[3]};
  padding: 20px 8px;
  width: 100%;
  margin: 8px;
  color: ${({ theme }) => theme.colors.text};
  box-sizing: border-box;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 10px;
  outline: none;
  text-transform: uppercase;
  
  &::placeholder {
    text-transform: uppercase;
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.whites[1]};
  }
  
  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus, 
  &:-webkit-autofill:active {
    background-color: ${({ theme }) => theme.colors.accent};
  }
  
  &[type="checkbox"] {
    cursor: pointer;
  }
`;

const StyledError = styled.span`
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.4rem;
`;

export interface InputProps {
  id: string;
  className?: string;
  label?: string;
  error?: string;
  ref?: React.Ref<any>;
}

const Input: React.FC<InputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  id,
  className = '',
  label = '',
  error = '',
  ref = null,
  ...attrs
}) => {
  return (
    <>
      {label
        && <StyledLabel htmlFor={id}>{label}</StyledLabel>
      }
      <StyledInput
        name={id}
        id={id}
        className={className}
        ref={ref}
        {...attrs}
      />
      {error
        && <StyledError>{error}</StyledError>
      }
    </>
  );
};

export default Input;
