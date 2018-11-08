import React from 'react';
import PropTypes from 'prop-types';
import './InformationSection.less';

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

const MediaImage = ({ image }) => <div className='image__container'><img className='image__item' src={image}/></div>;

MediaImage.propTypes = {
  image: PropTypes.string.isRequired,
};

const Title = ({ title }) => <div className='title__container'><h2>{title}</h2></div>;

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

const ImdbRating = ({ rating }) => <p>{rating}</p>;

ImdbRating.propTypes = {
  rating: PropTypes.number,
};

const MediaType = ({ type }) => <p>{type}</p>;

MediaType.propTypes = {
  type: PropTypes.string,
};

const MediaDirector = ({ director }) => <p>{director}</p>;

MediaDirector.propTypes = {
  director: PropTypes.string,
};

export default InformationSection;
