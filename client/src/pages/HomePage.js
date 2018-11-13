import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './HomePage.less';
import { fetchMediaById, searchMedia } from '../modules/media/actions';
import Index from '../components/SearchBar/index';
import ToggleButtonGroup from '../components/SearchBar/ToggleButtonGroup';
import CoverDisplay from '../components/CoverDisplay/index';

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
    hasSearched: PropTypes.bool.isRequired,
  };

  state = { toggled: 0 };

  onSearchSubmit = (value) => {
    console.info(value);
    this.props.searchMedia(value, null);
  };

  onToggle = id => this.setState({ toggled: id });

  render() {
    // const { detailedMedia, loading, error } = this.props
    return <main className="homepage">
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
      <CoverDisplay media={this.props.allMedia} hasSearched={this.props.hasSearched}/>
    </main>;
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
