import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import MediaDirector from './MediaDirector';
import MediaType from './MediaType';
import ImdbRating from './ImdbRating';
import Title from './Title';
import MediaImage from './MediaImage';

const defaultImg = 'https://nti.biz/globalassets/images/cards-286x160px/no-image-found.jpg';

const InformationSection = ({ details }) => (
  <div className='information__container'>
        <MediaImage image={details.thumbnails ? details.thumbnails.small : defaultImg }/>
    <div className='details__container'>
        <Title title={details.name}/>
        <ImdbRating rating={`imdb rating: ${details.rating}`}/>
        <MediaType type={`Type of media: ${details.type}`}/>
        <MediaDirector director={`Director: ${details.director}`}/>
        </div>
    </div>
);

InformationSection.propTypes = {
  details: PropTypes.shape.isRequired,
};

export default InformationSection;
