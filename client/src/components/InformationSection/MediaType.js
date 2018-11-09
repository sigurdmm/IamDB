import PropTypes from 'prop-types';
import React from 'react';

const MediaType = ({ type }) => <h3>{type}</h3>;

MediaType.propTypes = {
  type: PropTypes.string,
};

export default MediaType;
