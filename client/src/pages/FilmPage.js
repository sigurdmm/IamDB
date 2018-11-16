import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchMediaById, addComment } from '../modules/media/actions';
import CoverDisplay from '../components/CoverDisplay/index';
import './FilmPage.less';
import MediaInformation from '../components/MediaInformation';
import CommentList from '../components/CommentList';

export class FilmPage extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
    }),
    fetchMediaById: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
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

  addComment = comment => this.props.addComment(this.props.detailedMedia.id, comment);

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
      <MediaInformation details={detailedMedia}/>
      <section className='description__container'>
        <h2>Description</h2>
        <p>{detailedMedia.description}</p>
      </section>
      <section>
        <h2>Actors</h2>
        <CoverDisplay onSort={false} hasSearched={true} media={detailedMedia.actors} url='/actor/'/>
      </section>
      <section className="filmpage__comments">
        <h2>Comment section</h2>
        <CommentList comments={detailedMedia.comments || []} onSubmit={this.addComment}/>
      </section>
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
  addComment,
};

export default connect(mapStateToProps, actionsToProps)(FilmPage);
