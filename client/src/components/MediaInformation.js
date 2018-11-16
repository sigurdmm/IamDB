import React from 'react';
import PropTypes from 'prop-types';
import './InformationSection/index.less';
import MediaType from './InformationSection/MediaType';
import MediaDirector from './InformationSection/MediaDirector';

import InformationSection from './InformationSection';

/**
 * Presents metadata about some media, such as image, type and director
 */
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
