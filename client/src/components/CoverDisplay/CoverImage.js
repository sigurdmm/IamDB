import React from 'react';
import PropTypes from 'prop-types';

export default function CoverImage({ link }) {
  return <div className='coverdisplay__gridelement'>
    <img src={link}/>
  </div>;
}

CoverImage.propTypes = {
  link: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
};
