import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.less';
import CoverImage from './CoverImage';

export default class CoverDisplay extends PureComponent {
  static propTypes = {
    media: PropTypes.array,
  };

  static defaultProps = {
    media: [],
  };

  render() {
    return <div className='coverdisplay'>
      { this.props.media && this.props.media.length > 0
        ? this.props.media.map((cover, i) => <CoverImage link={cover.thumbnails} id={cover.id} key={`cover-${i}`} />)
        : <p className='coverdisplay__error'>NOTHING FOUND</p>}
    </div>;
  }
}
