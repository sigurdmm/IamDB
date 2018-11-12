import PropTypes from 'prop-types';
import React from 'react';

const ImdbRating = ({ rating }) => <h3>{`Imdb rating: ${rating}`}</h3>;

ImdbRating.propTypes = {
  rating: PropTypes.string,
};

ImdbRating.defaultProps = {
  rating: 'Unknown',
};

export default ImdbRating;
