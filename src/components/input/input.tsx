import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.fg};
  font-size: 1.6rem;
  font-weight: 600;
`;

const StyledInput = styled.input`
  font-size: 2.2rem;
  padding: 20px 8px;
  min-width: 280px;
  width: 100%;
  margin: 8px;
  color: ${({ theme }) => theme.fg};
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.bgActive};
  outline: none;
  
  &::placeholder {
    font-size: 2rem;
    color: ${({ theme }) => theme.fg};
  }
  
  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus, 
  &:-webkit-autofill:active {
    background-color: ${({ theme }) => theme.bgActive};
  }
`;

const StyledError = styled.span`
  margin-top: 10px;
  color: ${({ theme }) => theme.fgError};
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
