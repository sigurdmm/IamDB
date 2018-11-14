import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.less';
import CoverImage from './CoverImage';

export default class CoverDisplay extends PureComponent {
  static propTypes = {
    media: PropTypes.array,
    pagination: PropTypes.element,
    hasSearched: PropTypes.bool.isRequired,
  };

  render() {
    const { media } = this.props;

    if (!this.props.hasSearched) {
      return null;
    }
    if (media === null) {
      return <p className='coverdisplay__error'>NOTHING FOUND</p>;
    }

    return <div>
      <div className='coverdisplay'>
        {media.map((cover, i) => <CoverImage
          thumbnail={cover.thumbnails ? cover.thumbnails.small : null}
          title={cover.name}
          rating={cover.rating}
          id={cover.id}
          key={`cover-${i}`}/>)
        }
      </div>
      {media.length > 0 && this.props.pagination}
    </div>;
  }
}
