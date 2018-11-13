import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './HomePage.less';
import { fetchMediaById, searchMedia } from '../modules/media/actions';
import SearchBar from '../components/SearchBar/index';
import CoverDisplay from '../components/CoverDisplay/index';
import FilterAndSort from '../components/FilterAndSort';

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
      type: PropTypes.oneOf(['movie', 'tv-show']),
    }),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
  };

  state = { toggled: 0 };

  onSearchSubmit = (value) => {
    console.info(value);
    this.props.searchMedia(value, this.state.toggled);
  };

  onToggle = id => this.setState({ toggled: id });

  render() {
    return <main className="homepage">
      <SearchBar onSubmit={this.onSearchSubmit}/>
      <FilterAndSort/>
      <CoverDisplay media={this.props.allMedia}/>
    </main>;
  }
}

const mapStateToProps = state => ({
  allMedia: state.media.allMedia,
  loading: state.media.loading,
  error: state.media.error,
});

const actionsToProps = {
  fetchMediaById,
  searchMedia,
};

export default connect(mapStateToProps, actionsToProps)(HomePage);
