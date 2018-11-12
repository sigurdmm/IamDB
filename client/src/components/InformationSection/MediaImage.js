import PropTypes from 'prop-types';
import React from 'react';
import defaultImage from '../../../public/no-image-found.jpg';

const MediaImage = ({ image }) => <div className='mediaimage'>
  <img className='image__item' src={image ? image.small : defaultImage }/>
</div>;

MediaImage.propTypes = {
  image: PropTypes.string,
};

export default MediaImage;
