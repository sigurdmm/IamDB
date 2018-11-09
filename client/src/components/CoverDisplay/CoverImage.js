import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CoverImage = ({ link, id }) => <div className='coverdisplay__gridelement'>
  <Link to={`/media/${id}`}>
    <img src={link}/>
  </Link>
</div>;

CoverImage.propTypes = {
  link: PropTypes.string.isRequired,
  id: PropTypes.string,
};

export default CoverImage;
