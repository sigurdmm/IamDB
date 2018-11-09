import PropTypes from 'prop-types';
import React from 'react';

const MediaImage = ({ image }) => <div className='image__container'><img className='image__item' src={image}/></div>;

MediaImage.propTypes = {
  image: PropTypes.string,
};

export default MediaImage;
