import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.less';
import CoverImage from './CoverImage';

const defaultImg = 'https://nti.biz/globalassets/images/cards-286x160px/no-image-found.jpg';

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
        ? this.props.media.map((cover, i) => <CoverImage link={cover.thumbnails ? cover.thumbnails.small : defaultImg} id={cover.id} key={`cover-${i}`} />)
        : <p className='coverdisplay__error'>NOTHING FOUND</p>}
    </div>;
  }
}
