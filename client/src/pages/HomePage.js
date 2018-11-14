import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './HomePage.less';
import { searchMedia, updateSearchFields } from '../modules/media/actions';
import Index from '../components/SearchBar/index';
import ToggleButtonGroup from '../components/SearchBar/ToggleButtonGroup';
import CoverDisplay from '../components/CoverDisplay/index';
import ApplicationAnimationCover from '../components/ApplicationAnimationCover';
import Paginator from '../components/Paginator';

export class HomePage extends React.Component {
  static propTypes = {
    searchMedia: PropTypes.func.isRequired,
    updateSearchFields: PropTypes.func.isRequired,

    limit: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    type: PropTypes.string,
    query: PropTypes.string,
    total: PropTypes.number.isRequired,

    allMedia: PropTypes.array,

    detailedMedia: PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      rating: PropTypes.number,
      // In unix timestamp
      released: PropTypes.any,
      actors: PropTypes.array,
      director: PropTypes.string,
      thumbnails: PropTypes.shape({
        small: PropTypes.string,
        large: PropTypes.string,
      }),
      type: PropTypes.oneOf(['movie', 'series']),
    }),

    loading: PropTypes.bool.isRequired,

    error: PropTypes.string,

    hasSearched: PropTypes.bool.isRequired,
  };

  state = { toggled: 0 };

  onSearchSubmit = (value) => {
    console.info(value);
    const offset = this.props.offset || 0;
    this.props.searchMedia(value, null, 3, offset);
  };

  onToggle = id => this.setState({ toggled: id });

  /**
   * Updates the search fields with a new offset value
   * */
  doPagination = newOffset => this.props.updateSearchFields({ offset: newOffset });

  render() {
    const {
      total,
      offset,
      limit,
      allMedia,
      hasSearched,
    } = this.props;

    return <>
      <ApplicationAnimationCover/>
      <main className="homepage">
        <Index onSubmit={this.onSearchSubmit}/>
        <ToggleButtonGroup
          toggled={this.state.toggled}
          onToggle={this.onToggle}
          buttons={[
            {
              content: 'Movie',
            },
            {
              content: 'TV Show',
            },
          ]}/>
        <CoverDisplay
          pagination={<Paginator
            limit={limit}
            offset={offset}
            total={total}
            onPagination={this.doPagination}/>}
          media={allMedia}
          hasSearched={hasSearched}/>
      </main>
    </>;
  }
}

const mapStateToProps = state => ({
  allMedia: state.media.allMedia,
  total: state.media.total,
  query: state.media.query,
  sort: state.media.sort,
  offset: state.media.offset,
  limit: state.media.limit,
  loading: state.media.loading,
  error: state.media.error,
  hasSearched: state.media.hasSearched,
});

const actionsToProps = {
  updateSearchFields,
  searchMedia,
};

export default connect(mapStateToProps, actionsToProps)(HomePage);
