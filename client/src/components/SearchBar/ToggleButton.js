import PropTypes from 'prop-types';
import React from 'react';

const ToggleButton = ({ children, onClick, active }) => <button
  onClick={onClick}
  className={`togglebuttons__button${active ? ' togglebuttons__button--toggled' : ''}`}>{children}</button>;

ToggleButton.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default ToggleButton;
