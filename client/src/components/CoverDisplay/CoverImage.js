import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultImage from '../InformationSection/no-image-found.jpg';

const CoverImage = ({ link, id }) => <div className='coverdisplay__gridelement'>
  <Link to={`/media/${id}`}>
    <img src={link || defaultImage}/>
  </Link>
</div>;

CoverImage.propTypes = {
  link: PropTypes.string,
  id: PropTypes.string,
};

export default CoverImage;
