import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultImage from '../../../public/no-image-found.jpg';

const CoverImage = ({ link, id }) => <div className='coverdisplay__gridelement'>
  <Link to={`/media/${id}`}>
    <img src={link ? link.small : defaultImage}/>
  </Link>
</div>;

CoverImage.propTypes = {
  link: PropTypes.string,
  id: PropTypes.string,
};

CoverImage.defaultProps = {
  link: defaultImage,
};

export default CoverImage;
