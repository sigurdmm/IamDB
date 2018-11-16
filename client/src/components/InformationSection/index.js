import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import Title from './Title';
import MediaImage from './MediaImage';
import ImdbRating from './ImdbRating';

const InformationSection = ({ details, children = '' }) => (
  <div className='information__container'>
    <MediaImage image={details.thumbnails ? details.thumbnails.small : null}/>
    <div className='information'>
      <Title title={details.name}/>
      <ImdbRating rating={details.rating || details.popularity}/>
      {children}
    </div>
  </div>
);

InformationSection.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.any,
};

export default InformationSection;
