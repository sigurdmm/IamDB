import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './HomePage.less';
import { fetchMediaById, searchMedia } from '../modules/media/actions';
import SearchBar from '../components/SearchBar/index';
import CoverDisplay from '../components/CoverDisplay/index';
import ApplicationAnimationCover from '../components/ApplicationAnimationCover';

const toggleButtons = [
  { label: 'All', value: 'all' },
  { label: 'Movies', value: 'movies' },
  { label: 'TV Shows', value: 'series' },
];

export class HomePage extends React.Component {
  static propTypes = {
    searchMedia: PropTypes.func.isRequired,
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

  state = { toggled: null };

  onSearchSubmit = (value) => {
    /**
     * If no media type is toggled (=== null) use the first buttons value for search
     * else use the toggled buttons value
     */
    this.props.searchMedia(value,
      this.state.toggled === null
        ? toggleButtons[0]
        : this.state.toggled.value);
  };

  onToggle = button => this.setState({ toggled: button });

  render() {
    return <>
      <ApplicationAnimationCover/>
      <main className="homepage">
      <SearchBar
        onSubmit={this.onSearchSubmit}
        onToggle={this.onToggle}
        toggled={this.state.toggled}
        buttons={toggleButtons}
      />
      <CoverDisplay media={this.props.allMedia} hasSearched={this.props.hasSearched}/>
    </main>
    </>;
  }
}

const mapStateToProps = state => ({
  allMedia: state.media.allMedia,
  loading: state.media.loading,
  error: state.media.error,
  hasSearched: state.media.hasSearched,
});

const actionsToProps = {
  fetchMediaById,
  searchMedia,
};

export default connect(mapStateToProps, actionsToProps)(HomePage);
