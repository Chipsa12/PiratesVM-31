import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.fg};
  font-size: 2rem;
  margin: 4px;
  padding: 20px 10px;
  border: none;
  border-radius: 50px;
  user-select: none;
  line-height: 2.3rem;

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.bgActive};
    border: 1px solid;
  }

  &:focus {
    outline: none;
    border: 1px solid;
  }
  
  &[disabled] {
    opacity: 0.9;
    cursor: not-allowed;
  }
`;

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.ReactEventHandler) => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children = 'Default button',
  onClick = () => {},
  className = '',
  disabled = false,
  ...attrs
}) => {
  const onClickAction = (event) => disabled ? event.preventDefault() : onClick(event);

  return (
    <StyledButton
      className={className}
      disabled={disabled}
      onClick={onClickAction}
      {...attrs}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
