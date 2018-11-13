import PropTypes from 'prop-types';
import React from 'react';

const MediaDirector = ({ director }) => <h3>{`Director: ${director}`}</h3>;

MediaDirector.propTypes = {
  director: PropTypes.string.isRequired,
};

export default MediaDirector;
