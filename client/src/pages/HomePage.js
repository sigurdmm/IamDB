import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchMediaById } from '../modules/media/actions';

class HomePage extends React.Component {
  static propTypes = {
    fetchMediaById: PropTypes.func.isRequired,
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
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
  };

  componentDidMount() {
    this.props.fetchMediaById(2);
  }

  render() {
    const { detailedMedia, loading, error } = this.props;

    if (error) {
      return <div>
        <section className="feedback feedback--error">
          <h3 className="feedback__heading">Failed to load media</h3>
          <p className="feedback__message">{error}</p>
        </section>
      </div>;
    }

    return <div>
      {loading && <div>
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
  loading: state.media.loading,
  error: state.media.error,
});

const actionsToProps = {
  fetchMediaById,
};

export default connect(mapStateToProps, actionsToProps)(HomePage);
