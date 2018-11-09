import React from 'react';
import PropTypes from 'prop-types';

const CoverImage = ({ link }) => <div className='coverdisplay__gridelement'>
  <img src={link}/>
</div>;

CoverImage.propTypes = {
  link: PropTypes.string.isRequired,
};

export default CoverImage;
