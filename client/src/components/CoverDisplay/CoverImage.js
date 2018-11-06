import React from 'react';
import PropTypes from 'prop-types';

export default function CoverImage({ link }) {
  return <img src={link}/>;
}

CoverImage.propTypes = {
  link: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
};
