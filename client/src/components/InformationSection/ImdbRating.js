import PropTypes from 'prop-types';
import React from 'react';

const ImdbRating = ({ rating = 0.0 }) => <h3>{`⭐️: ${rating}`}</h3>;

ImdbRating.propTypes = {
  rating: PropTypes.number,
};

export default ImdbRating;
