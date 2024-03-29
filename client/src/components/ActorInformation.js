import React from 'react';
import PropTypes from 'prop-types';
import './InformationSection/index.less';

import InformationSection from './InformationSection';

/**
 * component to render information about actor
 */
const ActorInformation = ({ details }) => <InformationSection details={details}/>;

ActorInformation.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ActorInformation;
