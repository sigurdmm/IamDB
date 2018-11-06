import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import CoverImage from './CoverImage';

export default class CoverDisplay extends React.Component {
  static propTypes = {
    media: PropTypes.array,
  };

  render() {
    return <div className='coverdisplay'>
      { this.props.media
        ? this.props.media.map((object, i) => <CoverImage link={object.thumbnails.small} key={i} />)
        : <p>NOTHING FOUND</p>}
    </div>;
  }
}
