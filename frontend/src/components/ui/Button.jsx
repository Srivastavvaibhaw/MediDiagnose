// src/components/ui/Button.jsx
import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import '../../styles/components/ui/Button.css';

const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  startIcon,
  endIcon,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const buttonClasses = `custom-button ${className} ${loading ? 'loading' : ''}`;

  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      startIcon={loading ? null : startIcon}
      endIcon={loading ? null : endIcon}
      onClick={onClick}
      type={type}
      className={buttonClasses}
      {...props}
    >
      {loading && <CircularProgress size={24} className="button-loader" />}
      <span className={loading ? 'button-text-loading' : ''}>{children}</span>
    </MuiButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'info', 'warning']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default Button;
