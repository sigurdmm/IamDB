import PropTypes from 'prop-types';
import React from 'react';

const MediaType = ({ type }) => <h3>Type of media: {type || 'unknown'}</h3>;

MediaType.propTypes = {
  type: PropTypes.string.isRequired,
};

export default MediaType;
