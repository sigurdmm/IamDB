import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultImage from '../InformationSection/no-image-found.jpg';

import './CoverImage.less';

/**
 * Return an em tag with rating if rating is passed as prop to CoverImage
 */
const getRating = (rating = null) => {
  if (!rating) {
    return (null);
  }
  return <em className='cover__overlay__rating'>⭐️: {rating}/10</em>;
};

/**
 * Return an strong tag with the a title
 * If released is passed as a prop to CoverImage it will return title(released)
 */
const getTitleAndYear = (title, released = null) => {
  // If no release year is passed, don't render release year
  if (!released) {
    return <strong className='cover__overlay__title'>{title}</strong>;
  }
  // else render "title (year)"
  const timestamp = new Date(parseInt(released, 10));
  const year = timestamp.getFullYear();
  return <strong className='cover__overlay__title'>{`${title} (${year})`}</strong>;
};
/**
 * Renders a div with a thumbnail. If no thumbnail is passed as a prop
 * it renders a default image.
 */
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
