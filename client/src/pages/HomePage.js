import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchMediaDetails } from '../modules/media/actions';

class HomePage extends React.Component {
  static propTypes = {
    fetchMediaDetails: PropTypes.func.isRequired,
    detailedMedia: PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      rating: PropTypes.number,
      // In unix timestamp
      released: PropTypes.number,
      actors: PropTypes.array,
      director: PropTypes.string,
      thumbnails: PropTypes.shape({
        small: PropTypes.string,
        large: PropTypes.string,
      }),
      type: PropTypes.oneOf(['movie', 'tv-show']),
    }),
  };

  componentDidMount() {
    this.props.fetchMediaDetails(1);
  }

  render() {
    const { detailedMedia } = this.props;

    return <div>
      {detailedMedia.id === -1 && <div>
        <p>Loading media ...</p>
      </div>}

      {detailedMedia.id !== -1 && <section>
        <em>Media: {detailedMedia.id}</em>
        <h2>{detailedMedia.name}</h2>

        <p>{detailedMedia.description}</p>

        <ul>
          {detailedMedia.actors.map(actor => <li
            key={`actor-${actor.replace(' ', '-')}`}>{actor}</li>)}
        </ul>
      </section>}
    </div>;
  }
}

const mapStateToProps = state => ({
  detailedMedia: state.media.detailedMedia,
});

const actionsToProps = {
  fetchMediaDetails,
};

export default connect(mapStateToProps, actionsToProps)(HomePage);
