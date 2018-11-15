import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchActorById } from '../modules/media/actions';
import ActorInformation from '../components/ActorInformation';
import CoverDisplay from '../components/CoverDisplay/index';
import './FilmPage.less';

export class ActorPage extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }),
    fetchActorById: PropTypes.func.isRequired,
    detailedActor: PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
      popularity: PropTypes.number,
      media: PropTypes.array,
      thumbnails: PropTypes.shape({
        small: PropTypes.string,
      }),
    }),
    loading: PropTypes.bool,
    error: PropTypes.string,
  };

  componentDidMount() {
    this.props.fetchActorById(this.props.match.params.id);
  }

  render() {
    const { detailedActor, loading, error } = this.props;

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
      <ActorInformation details={detailedActor}/>
      <div>
        <h2>Known for</h2>
        <CoverDisplay hasSearched={true} media={detailedActor.media} url='/media/'/>
      </div>
    </div>;
  }
}

const mapStateToProps = state => ({
  detailedActor: state.media.detailedActor,
  loading: state.media.loading,
  error: state.media.error,
});

const actionsToProps = {
  fetchActorById,
};

export default connect(mapStateToProps, actionsToProps)(ActorPage);
