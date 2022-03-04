import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, version, type, isDisabled }) => {
  return (
    <button
      type={type}
      className={`btn btn-${version}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  isDisabled: false,
  version: 'primary',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  version: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default Button;
