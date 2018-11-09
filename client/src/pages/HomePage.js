import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './HomePage.less';
import { fetchMediaById, searchMedia } from '../modules/media/actions';
import Index from '../components/SearchBar/index';
import ToggleButtonGroup from '../components/SearchBar/ToggleButtonGroup';
import CoverDisplay from '../components/CoverDisplay/index';

const coverimages = [
  'https://media.giphy.com/media/XUTz8zpPF458I/giphy.gif',
  'https://media.giphy.com/media/hCm2X1kXxjyZq/giphy.gif',
  'https://media.giphy.com/media/xpBiaXFbVUtTa/giphy.gif',
  'https://media.giphy.com/media/PrGNf7O36heCs/giphy.gif',
  'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif',
  'https://media.giphy.com/media/3ohzdUi5U8LBb4GD4s/giphy.gif',
  'https://media.giphy.com/media/3oEjI1erPMTMBFmNHi/giphy.gif',
];

const selectRandomItem = list => list[Math.floor(Math.random() * list.length)];

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
    // const { detailedMedia, loading, error } = this.props
    return <>
      <div className="systemcover"
           style={{ backgroundImage: `url('${selectRandomItem(coverimages)}')` }}/>
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
      <CoverDisplay media={this.props.allMedia}/>
    </main>
      </>;
  }
}

// [{ thumbnails: { small: 'https://m.media-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg' } },
//   { thumbnails: { small: 'https://m.media-amazon.com/images/M/MV5BOThhYmY3MjItMWFiZC00ZmRjLTg1NmQtMzdkMDJkYzc0ZDNhXkEyXkFqcGdeQXVyNzAwMjQwMTA@._V1_SX300.jpg' } },
// ]


// ['https://m.media-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg',
//   'https://m.media-amazon.com/images/M/MV5BOThhYmY3MjItMWFiZC00ZmRjLTg1NmQtMzdkMDJkYzc0ZDNhXkEyXkFqcGdeQXVyNzAwMjQwMTA@._V1_SX300.jpg',
//   'https://m.media-amazon.com/images/M/MV5BMzRjOTg1YWYtZTE0NC00MGI5LTlmNDAtMzllM2M1MmQ4N2ViXkEyXkFqcGdeQXVyNjczMzc5NzQ@._V1_SX300.jpg',
//   'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
//   'https://images-na.ssl-images-amazon.com/images/M/MV5BMzIxNzU4NjkwMV5BMl5BanBnXkFtZTgwNDU4NjM4MDE@._V1_SX300.jpg',
// ];

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
