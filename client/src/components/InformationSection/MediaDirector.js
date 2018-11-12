import PropTypes from 'prop-types';
import React from 'react';
import ImdbRating from './ImdbRating';

const MediaDirector = ({ director }) => <h3>{`Director: ${director}`}</h3>;

MediaDirector.propTypes = {
  director: PropTypes.string,
};

ImdbRating.defaultProps = {
  director: 'Unknown',
};

export default MediaDirector;
