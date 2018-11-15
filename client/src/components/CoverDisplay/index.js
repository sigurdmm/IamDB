import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.less';
import CoverImage from './CoverImage';
import SortingSelector from './SortingSelector';

export default class CoverDisplay extends PureComponent {
  static propTypes = {
    media: PropTypes.array,
    pagination: PropTypes.element,
    hasSearched: PropTypes.bool.isRequired,
    onSort: PropTypes.func,
  };

  render() {
    const { media } = this.props;
    // Don't render the CoverDisplay if users hasn't searched yet.
    if (!this.props.hasSearched) {
      return null;
    }
    // Render error message instead of an empty CoverDisplay
    // when search returns nothing
    if (media === null) {
      return <p className='coverdisplay__error'>NOTHING FOUND</p>;
    }

    return <div>
      <SortingSelector
        sortingMethods={
        [{ label: 'Rating', value: 'rating' },
          { label: 'Year', value: 'released' },
          { label: 'Name', value: 'name' },
        ]}
        onSort={this.props.onSort}
      />

      <div className='coverdisplay'>
        {media.map((cover, i) => <CoverImage
          thumbnail={cover.thumbnails ? cover.thumbnails.small : null}
          title={cover.name}
          rating={cover.rating}
          released={cover.released}
          id={cover.id}
          key={`cover-${i}`}/>)
        }
      </div>
      {media.length > 0 && this.props.pagination}
    </div>;
  }
}
