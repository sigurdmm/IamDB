import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.less';
import CoverImage from './CoverImage';
import LoadingSpinner from './LoadingSpinner';

export default class CoverDisplay extends PureComponent {
  static propTypes = {
    media: PropTypes.array,
    pagination: PropTypes.element,
    hasSearched: PropTypes.bool.isRequired,
    url: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
  };

  render() {
    const {
      media,
      pagination,
      error,
      loading,
    } = this.props;
    // Don't render the CoverDisplay if users hasn't searched yet.
    if (!this.props.hasSearched) {
      return null;
    }
    // Render error message instead of an empty CoverDisplay
    // when search returns nothing
    if (error !== null) {
      return <p className='coverdisplay__error'>{error}</p>;
    }
    if (media.length === 0 && !loading) {
      return <p className='coverdisplay__error'>Nothing Found</p>;
    }
    if (loading) {
      return <LoadingSpinner/>;
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
