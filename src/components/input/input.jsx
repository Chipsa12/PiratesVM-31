import React from 'react';
import PropTypes from 'prop-types';
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


const Input = ({
  id, className, label, error, ...attrs
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
        {...attrs}
      />
      {error
        && <StyledError>{error}</StyledError>
      }
    </>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
};

Input.defaultProps = {
  className: '',
  label: '',
  error: '',
};

export default Input;
