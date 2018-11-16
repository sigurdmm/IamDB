import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchActorById } from '../modules/actor/actorActions';
import ActorInformation from '../components/ActorInformation';
import CoverDisplay from '../components/CoverDisplay/index';
import WordCloud from '../components/WordCloud';
import '../App.less';
import AlertBar from '../components/AlertBar';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

/**
 * Fetches an actors, and presents relevant information
 * */
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

  receivedError = () => {
    const { error, loading } = this.props;
    return error !== null && !loading;
  };

  componentDidMount() {
    this.props.fetchActorById(this.props.match.params.id);
  }

  render() {
    const { detailedActor, loading, error } = this.props;

    if (loading) {
      return <LoadingSpinner/>;
    }

    return <div className='genericpage'>
      {this.receivedError() && <AlertBar message={error}/>}

      <ActorInformation details={detailedActor}/>
      <section className='elements'>
        <h2>Known for</h2>
        <CoverDisplay onSort={false} hasSearched={true} media={detailedActor.media} url='/media/'/>
        </section>
        <section>
        <h2>Directors {detailedActor.name} has worked with</h2>
        <WordCloud words={detailedActor.media.map(m => m.director).filter(name => !!name)}/>
      </section>
    </div>;
  }
}

const mapStateToProps = state => ({
  detailedActor: state.actor.detailedActor,
  loading: state.actor.loading,
  error: state.actor.error,
});

const actionsToProps = {
  fetchActorById,
};

export default connect(mapStateToProps, actionsToProps)(ActorPage);
