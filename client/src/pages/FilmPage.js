import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMediaById } from '../modules/media/actions';
import InformationSection from '../components/InformationSection/index';
import CoverDisplay from '../components/CoverDisplay/index';
import './FilmPage.less';


export class FilmPage extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }),
    fetchMediaById: PropTypes.func.isRequired,
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
    loading: PropTypes.bool,
    error: PropTypes.string,
  };

  componentDidMount() {
    this.props.fetchMediaById(this.props.match.params.id);
  }

  render() {
    const { detailedMedia, loading, error } = this.props;

    if (loading) {
      return <div>
        Laster inn
      </div>;
    }

    if (error) {
      return <div className='error__container'>
        Kunne ikke finne informasjon
      </div>;
    }

    return <div className='media__container'>
      <InformationSection details={detailedMedia}/>
      <div className='description__container'>
        <h2>Description</h2>
        <p>{detailedMedia.description}</p>
      </div>
      <div>
        <h2>Actors</h2>
        <CoverDisplay
          onSort={false}
          hasSearched={true}
          media={detailedMedia.actors}
        />
      </div>
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

export default connect(mapStateToProps, actionsToProps)(FilmPage);
