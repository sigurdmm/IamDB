import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.less';
import CoverImage from './CoverImage';

export default class CoverDisplay extends PureComponent {
  static propTypes = {
    media: PropTypes.array,
    pagination: PropTypes.element,
    hasSearched: PropTypes.bool.isRequired,
    url: PropTypes.string,
  };

  render() {
    const {
      media,
      pagination,
    } = this.props;
    // Don't render the CoverDisplay if users hasn't searched yet.
    if (!this.props.hasSearched) {
      return null;
    }
    // Render error message instead of an empty CoverDisplay
    // when search returns nothing
    if (media === null) {
      return <p className='coverdisplay__error'>NOTHING FOUND</p>;
    }

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
