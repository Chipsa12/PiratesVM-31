import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button<{ variant: ButtonProps['variant'] }>`
  background: ${props => props.variant === 'primary' ? props.theme.colors.text : props.theme.colors.primary};
  color: ${props => props.variant === 'primary' ? props.theme.colors.primary : props.theme.colors.text};
  font-size: 2rem;
  margin: 4px;
  padding: 20px 10px;
  border: none;
  border-radius: 4px;
  user-select: none;
  line-height: 2.3rem;
  transition: all 220ms ease-in-out;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
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
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children = 'Default button',
  onClick = () => {},
  className = '',
  disabled = false,
  variant = 'primary',
  ...attrs
}) => {
  const onClickAction = (event) => disabled ? event.preventDefault() : onClick(event);

  return (
    <StyledButton
      className={className}
      disabled={disabled}
      onClick={onClickAction}
      variant={variant}
      {...attrs}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
