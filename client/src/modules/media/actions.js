import {
  FETCH_MEDIA_DETAILS_REQUESTED,
  FETCH_ACTOR_DETAILS_REQUESTED,
  SEARCH_MEDIA_REQUESTED,
  UPDATE_SEARCH_FIELDS,
} from './constants';

// eslint-disable-next-line import/prefer-default-export
export const fetchMediaById = id => dispatch => dispatch({
  media: { id },
  type: FETCH_MEDIA_DETAILS_REQUESTED,
});

export const fetchActorById = id => dispatch => dispatch({
  actor: { id },
  type: FETCH_ACTOR_DETAILS_REQUESTED,
});

export const searchMedia = (query, type, limit = 4, offset = 0, sort = {}) => dispatch => dispatch({
  type: SEARCH_MEDIA_REQUESTED,
  query: {
    query,
    type,
    limit,
    offset,
    sort,
  },
});

export const updateSearchFields = fields => dispatch => dispatch({
  fields,
  type: UPDATE_SEARCH_FIELDS,
});
