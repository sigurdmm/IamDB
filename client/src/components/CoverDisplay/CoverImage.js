import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultImage from '../InformationSection/no-image-found.jpg';

import './CoverImage.less';

const getRating = (rating) => {
  if (typeof rating !== 'undefined') {
    return <em className='cover__overlay__rating'>{rating}/10</em>;
  }
  return (null);
};

const getTitleAndYear = (title, released) => {
  if (typeof released === 'undefined') {
    return <strong className='cover__overlay__title'>{title}</strong>;
  }
  const timestamp = new Date(parseInt(released, 10));
  return <strong className='cover__overlay__title'>{`${title} (${timestamp.getFullYear()})`}</strong>;
};

const CoverImage = ({
  thumbnail,
  title,
  rating,
  released,
  url,
}) => <div className={`cover ${!thumbnail ? 'cover--inverse' : ''}`}>
  <Link to={url}>
    <img className='cover__thumbnail' src={thumbnail || defaultImage}/>

    <div className='cover__overlay'>
      {getTitleAndYear(title, released)}
      {getRating(rating)}
    </div>
  </Link>
</div>;

CoverImage.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  url: PropTypes.string,
  released: PropTypes.any,
};

export default CoverImage;
