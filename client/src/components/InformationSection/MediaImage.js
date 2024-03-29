import PropTypes from 'prop-types';
import React from 'react';
import defaultImage from './no-image-found.jpg';

/**
 * Renders a thumbnail if given, or else shows a fallback image
 */
const MediaImage = ({ image = null }) => <div className='mediaimage'>
  <img className='image__item' src={image || defaultImage }/>
</div>;

MediaImage.propTypes = {
  image: PropTypes.string,
};

export default MediaImage;
