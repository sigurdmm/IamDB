import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

const AlertBar = ({
  type,
  message,
}) => {
  if (type === 'warning') {
    return <p className='alertbar__warning'>{message}</p>;
  }
  return <p className='alertbar__error'>{message}</p>;
};

AlertBar.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default AlertBar;
