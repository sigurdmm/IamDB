import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultImage from '../InformationSection/no-image-found.jpg';

import './CoverImage.less';

const CoverImage = ({
  thumbnail,
  title,
  rating,
  url,
}) => <div className='cover'>
  <Link to={url}>
    <img className='cover__thumbnail' src={thumbnail || defaultImage}/>
  </Link>
  <div className='cover__overlay'>
    <div className='cover__overlay__title'>{title}</div>
    <div className='cover__overlay__rating'>{rating}/10</div>
  </div>
</div>;

CoverImage.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  url: PropTypes.string,
};

export default CoverImage;
