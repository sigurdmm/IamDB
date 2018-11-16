import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchActorById } from '../modules/actor/actorActions';
import ActorInformation from '../components/ActorInformation';
import CoverDisplay from '../components/CoverDisplay/index';
import './FilmPage.less';
import WordCloud from '../components/WordCloud';

export class ActorPage extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.number.isRequired,
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
      <section>
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
