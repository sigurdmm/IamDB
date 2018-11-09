import PropTypes from 'prop-types';
import React from 'react';

const ImdbRating = ({ rating }) => <h3>{rating}</h3>;

ImdbRating.propTypes = {
  rating: PropTypes.string,
};

export default ImdbRating;
