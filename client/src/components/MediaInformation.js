import React from 'react';
import PropTypes from 'prop-types';
import './InformationSection/index.less';
import MediaType from './InformationSection/MediaType';
import MediaDirector from './InformationSection/MediaDirector';

import InformationSection from './InformationSection';

const MediaInformation = ({ details }) => <InformationSection details={details}>
  <MediaType type={details.type}/>
  <MediaDirector director={details.director}/>
</InformationSection>;

MediaInformation.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default MediaInformation;
