import React from 'react';
import PropTypes from 'prop-types';

import './CoverImage.less';

const CoverImage = ({ thumbnail, title, rating }) => <div className='cover'>
  {/* TODO: Add real placeholder image in case thumbnail isn't defined */}
  <img className='cover__thumbnail' src={thumbnail === null ? '' : thumbnail}/>
  <div className='cover__overlay'>
    <div className='cover__overlay__title'>{title}</div>
    <div className='cover__overlay__rating'>{rating}/10</div>
  </div>
</div>;

CoverImage.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default CoverImage;
