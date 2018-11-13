import PropTypes from 'prop-types';
import React from 'react';

const Title = ({ title }) => <div className='title__container'><h2>{title}</h2></div>;

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
