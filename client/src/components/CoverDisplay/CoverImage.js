import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultImage from '../InformationSection/no-image-found.jpg';

import './CoverImage.less';

const getRating = (rating) => {
  if (typeof (rating) !== 'undefined') {
    return <div className='cover__overlay__rating'>{rating}/10</div>;
  }
  return (null);
};

const CoverImage = ({
  thumbnail,
  title,
  rating,
  id,
}) => <div className='cover'>
  <Link to={`/media/${id}`}>
    <img className='cover__thumbnail' src={thumbnail || defaultImage}/>
  </Link>
  <div className='cover__overlay'>
    <div className='cover__overlay__title'>{title}</div>
    {getRating(rating)}
  </div>
</div>;

CoverImage.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  id: PropTypes.string,
};

export default CoverImage;
