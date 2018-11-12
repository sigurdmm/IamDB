import PropTypes from 'prop-types';
import React from 'react';
import ImdbRating from './ImdbRating';

const MediaType = ({ type }) => <h3>{`Type of media: ${type}`}</h3>;

MediaType.propTypes = {
  type: PropTypes.string,
};

ImdbRating.defaultProps = {
  type: 'Unknown',
};

export default MediaType;
