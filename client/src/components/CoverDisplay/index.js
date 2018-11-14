import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.less';
import CoverImage from './CoverImage';
import SortingSelector from './SortingSelector';

export default class CoverDisplay extends PureComponent {
  static propTypes = {
    media: PropTypes.array,
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

    const onSortSelect = (event) => {
      console.log(event.target.value);
    };

    return <div>
      <SortingSelector sortingFactors={['Rating', 'Year', 'Alphabetical']} onSortSelect={onSortSelect}/>
      <div className='coverdisplay'>
        {media.map((cover, i) => <CoverImage
          thumbnail={cover.thumbnails ? cover.thumbnails.small : null}
          title={cover.name}
          rating={cover.rating}
          id={cover.id}
          key={`cover-${i}`}/>)
        }
      </div>
    </div>;
  }
}
