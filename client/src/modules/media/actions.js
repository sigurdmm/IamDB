import {
  FETCH_MEDIA_DETAILS_REQUESTED,
  SEARCH_MEDIA_REQUESTED,
  UPDATE_SEARCH_FIELDS,
} from './constants';

// eslint-disable-next-line import/prefer-default-export
export const fetchMediaById = id => dispatch => dispatch({
  media: { id },
  type: FETCH_MEDIA_DETAILS_REQUESTED,
});

export const searchMedia = (
  query,
  type,
  limit = 4,
  offset = 0,
  sortField,
  sortDirection,
) => dispatch => dispatch({
  type: SEARCH_MEDIA_REQUESTED,
  query: {
    query,
    type,
    limit,
    offset,
    sortField,
    sortDirection,
  },
});

export const updateSearchFields = fields => dispatch => dispatch({
  fields,
  type: UPDATE_SEARCH_FIELDS,
});
