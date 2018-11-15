import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultImage from '../InformationSection/no-image-found.jpg';

import './CoverImage.less';

const getRating = (rating) => {
  if (typeof rating !== 'undefined') {
    return <div className='cover__overlay__rating'>{rating}/10</div>;
  }
  return (null);
};

const getTitleAndYear = (title, released) => {
  if (typeof released === 'undefined') {
    return <div className='cover__overlay__title'>{title}</div>;
  }
  const timestamp = new Date(parseInt(released, 10));
  return <div className='cover__overlay__title'>{`${title} (${timestamp.getFullYear()})`}</div>;
};

const CoverImage = ({
  thumbnail,
  title,
  rating,
  released,
  id,
}) => <div className='cover'>
  <Link to={`/media/${id}`}>
    <img className='cover__thumbnail' src={thumbnail || defaultImage}/>
  </Link>
  <div className='cover__overlay'>
    {getTitleAndYear(title, released)}
    {getRating(rating)}
  </div>
</div>;

CoverImage.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  released: PropTypes.any,
  id: PropTypes.string,
};

export default CoverImage;
