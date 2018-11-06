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
        ? this.props.media.map((cover, i) => <CoverImage link={cover.thumbnails.small} key={i} />)
        : <p className='coverdisplay__error'>NOTHING FOUND</p>}
    </div>;
  }
}
