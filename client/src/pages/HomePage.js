import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './HomePage.less';
import { fetchMediaById, searchMedia } from '../modules/media/actions';
import SearchBar from '../components/SearchBar';
import ToggleButtonGroup from '../components/ToggleButtonGroup';

class HomePage extends React.Component {
  static propTypes = {
    searchMedia: PropTypes.func.isRequired,
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

  state = {
    toggled: 0,
  };

  onSearchSubmit = (value) => {
    console.info(value);
    this.props.searchMedia(value, this.state.toggled);
    // console.log(`find ${this.state.toggled === 0 ? 'movies' : 'tvshow'} named ${value}`);
  };

  onToggle = i => () => {
    if (this.state.toggled !== i) {
      this.setState({
        toggled: i,
      });
    }
  };


  render() {
    // const { detailedMedia, loading, error } = this.props;

    return <div className="homepage">
      <SearchBar onSubmit={this.onSearchSubmit}/>
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
    </div>;
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
