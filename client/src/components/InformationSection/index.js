import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import MediaDirector from './MediaDirector';
import MediaType from './MediaType';
import ImdbRating from './ImdbRating';
import Title from './Title';
import MediaImage from './MediaImage';

const InformationSection = ({ details }) => (
  <div className='information__container'>
        <MediaImage image={details.thumbnails}/>
    <div>
        <Title title={details.name}/>
        <ImdbRating rating={details.rating}/>
        <MediaType type={details.type}/>
        <MediaDirector director={details.director}/>
        </div>
    </div>
);

InformationSection.propTypes = {
  details: PropTypes.shape.isRequired,
};

export default InformationSection;
