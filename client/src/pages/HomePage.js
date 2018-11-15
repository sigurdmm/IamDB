import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './HomePage.less';

import { searchMedia, updateSearchFields } from '../modules/media/actions';
import SearchBar from '../components/SearchBar/index';
import CoverDisplay from '../components/CoverDisplay/index';
import ApplicationAnimationCover from '../components/ApplicationAnimationCover';
import Paginator from '../components/Paginator';
import ToggleButtonGroup from '../components/SearchBar/ToggleButtonGroup';
import Sorting from '../components/Sorting';

const toggleButtons = [
  { label: 'All', value: null },
  { label: 'Movies', value: 'movie' },
  { label: 'TV Shows', value: 'series' },
];

const sortOptions = [
  { label: 'Rating', value: 'rating' },
  { label: 'Released', value: 'released' },
  { label: 'Name', value: 'name' },
];

export class HomePage extends React.Component {
  static propTypes = {
    searchMedia: PropTypes.func.isRequired,
    updateSearchFields: PropTypes.func.isRequired,

    limit: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    type: PropTypes.string,
    query: PropTypes.string,
    sortField: PropTypes.string,
    sortDirection: PropTypes.number,
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

  onSearchSubmit = (query) => {
    const {
      limit,
      type,
      sortField,
      sortDirection,
    } = this.props;

    /**
     * If no media type is toggled (=== null) use the first buttons value for search
     * else use the toggled buttons value
     */
    // const type = this.state.toggled === null ? toggleButtons[0] : this.state.toggled.value;

    // Expect to start with a fresh offset,
    // when submitting a new search query
    this.props.updateSearchFields({ query, offset: 0 });
    this.props.searchMedia(query, type, limit, 0, sortField, sortDirection);
  };

  onToggle = (button) => {
    this.props.updateSearchFields({ type: button.value });
  };

  onSort = (value) => {
    const {
      limit,
      query,
      type,
      sortDirection,
    } = this.props;

    this.props.updateSearchFields({ sortField: value });

    this.props.searchMedia(
      query,
      type,
      limit,
      0,
      value,
      sortDirection,
    );
  };

  onDirectionClick = (sortDirection) => {
    const {
      limit,
      query,
      type,
      sortField,
    } = this.props;

    this.props.updateSearchFields({ sortDirection });
    this.props.searchMedia(
      query,
      type,
      limit,
      0,
      sortField,
      sortDirection,
    );
  };

  /**
   * Updates the search fields with a new offset value
   * */
  doPagination = (newOffset) => {
    const {
      limit,
      query,
      type,
      sortField,
      sortDirection,
    } = this.props;

    // Ensure the metadata is updated
    this.props.updateSearchFields({ offset: newOffset });
    // Do the actual search
    this.props.searchMedia(query, type, limit, newOffset, sortField, sortDirection);
  };

  render() {
    const {
      total,
      offset,
      limit,
      allMedia,
      hasSearched,
      sortDirection,
    } = this.props;

    return <>
      <ApplicationAnimationCover/>
      <main className="homepage">
        <div className='filterandsearch'>
          <ToggleButtonGroup
            toggled={this.props.type}
            onToggle={this.onToggle}
            buttons={toggleButtons}
          />
          <SearchBar
            onSubmit={this.onSearchSubmit}
          />
        </div>
        <Sorting
          directionValue={sortDirection}
          onDirectionClick={this.onDirectionClick}
          onSort={this.onSort}
          visible={this.props.hasSearched}
          sortingMethods={sortOptions}/>
        <CoverDisplay
          media={allMedia}
          hasSearched={hasSearched}
          pagination={
            <Paginator
              limit={limit}
              offset={offset}
              total={total}
              onPagination={this.doPagination}
            />}
        />
      </main>
    </>;
  }
}

const mapStateToProps = state => ({
  allMedia: state.media.allMedia,
  total: state.media.total,
  query: state.media.query,
  sortField: state.media.sortField,
  sortDirection: state.media.sortDirection,
  type: state.media.type,
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
