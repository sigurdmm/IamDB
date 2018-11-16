import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './HomePage.less';

import { searchMedia, updateSearchFields } from '../modules/media/actions';
import SearchBar from '../components/SearchBar/index';
import CoverDisplay from '../components/CoverDisplay/index';
import ApplicationAnimationCover from '../components/ApplicationAnimationCover';
import Paginator from '../components/Paginator';
import ToggleButtonGroup from '../components/ToggleButtonGroup/index';
import Sorting from '../components/Sorting';
import AlertBar from '../components/AlertBar';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

/**
 * list of selectable media types to filter on
 */
const toggleButtons = [
  { label: 'All', value: null },
  { label: 'Movies', value: 'movie' },
  { label: 'TV Shows', value: 'series' },
];

/**
 * list of the different fields you can sort with
 */
const sortOptions = [
  { label: 'Rating', value: 'rating' },
  { label: 'Released', value: 'released' },
  { label: 'Name', value: 'name' },
];

/**
 * Responsible for rendering search view and search results.
 * It's the landing page for the application.
 */
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

  /**
   * Checks parameters if there has occured an error after
   * a search is submitted and the loading is completed.
   */
  receivedError = () => {
    const { error, hasSearched, loading } = this.props;
    return error !== null && hasSearched && !loading;
  };

  hasLoadedSuccessfully = () => {
    const { error, hasSearched, loading } = this.props;
    return error === null && hasSearched && !loading;
  };

  onSearchSubmit = (newQuery) => {
    const {
      limit, type, sortField, sortDirection,
    } = this.props;

    /**
     * If no media type is toggled (=== null) use the first buttons value for search
     * else use the toggled buttons value
     */

    // Expect to start with a fresh offset,
    // when submitting a new search query
    this.props.updateSearchFields({ query: newQuery, offset: 0 });
    this.props.searchMedia(newQuery, type, limit, 0, sortField, sortDirection);
  };

  /**
   * Update redux state and submit a search with a new type parameter
   */
  onToggle = (newType) => {
    const {
      limit, query, sortField, sortDirection,
    } = this.props;

    this.props.updateSearchFields({ type: newType });

    if (query != null) {
      this.props.searchMedia(query, newType, limit, 0, sortField, sortDirection);
    }
  };

  /**
   * Update redux state and submit a search with a new sortField parameters
   */
  onSort = (newSortField) => {
    const {
      limit, query, type, sortDirection,
    } = this.props;

    this.props.updateSearchFields({ sortField: newSortField });

    this.props.searchMedia(query, type, limit, 0, newSortField, sortDirection);
  };

  /**
   * Update redux state and submit a search with a new sortDirection parameter
   */
  onDirectionClick = (newSortDirection) => {
    const {
      limit, query, type, sortField,
    } = this.props;

    this.props.updateSearchFields({ sortDirection: newSortDirection });
    this.props.searchMedia(query, type, limit, 0, sortField, newSortDirection);
  };

  /**
   * Update redux state and submit a search with a new offset parameter
   * */
  doPagination = (newOffset) => {
    const {
      limit, query, type, sortField, sortDirection,
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
      sortDirection,
      sortField,
      error,
      loading,
      query,
      type,
    } = this.props;

    return <>
      <ApplicationAnimationCover/>
      <main className="homepage">
        <div className='filterandsearch'>
          <ToggleButtonGroup
            toggled={type}
            onToggle={this.onToggle}
            buttons={toggleButtons}
          />
          <SearchBar
            initialValue={query}
            onSubmit={this.onSearchSubmit}
          />
        </div>
        {this.receivedError() && <AlertBar message={error}/>}

        {this.hasLoadedSuccessfully() && <Sorting
          directionValue={sortDirection}
          fieldValue={sortField}
          onDirectionClick={this.onDirectionClick}
          onSort={this.onSort}
          sortingMethods={sortOptions}/>
        }
        {loading && <LoadingSpinner/>}
        {this.hasLoadedSuccessfully() && <CoverDisplay
            media={allMedia}
            url='/media/'
            pagination={
              <Paginator
                limit={limit}
                offset={offset}
                total={total}
                onPagination={this.doPagination}
              />}
          />
        }
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
