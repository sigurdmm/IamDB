import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.less';
import CoverImage from './CoverImage';

export default class CoverDisplay extends PureComponent {
  static propTypes = {
    media: PropTypes.array,
    pagination: PropTypes.element,
    url: PropTypes.string,
  };

  render() {
    const {
      media,
      pagination,
    } = this.props;

    return <>
      <div className='coverdisplay'>
        {media.map((cover, i) => <CoverImage
          thumbnail={cover.thumbnails ? cover.thumbnails.small : null}
          title={cover.name}
          rating={cover.rating}
          key={`cover-${i}`}
          url={`${this.props.url}${cover.id}`}
          released={cover.released}/>)}
      </div>
    { media.length > 0 && pagination }
    </>;
  }
}
