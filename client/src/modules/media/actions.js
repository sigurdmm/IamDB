import {
  ADD_MEDIA_COMMENT_REQUESTED,
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

/**
 * Appends a comment to some media
 * @param {string} mediaId Identifier for the media we wan't the comment appended
 * @param {string} comment Comment in text form
 * */
export const addComment = (mediaId, comment) => dispatch => dispatch({
  mediaId,
  comment,
  type: ADD_MEDIA_COMMENT_REQUESTED,
});
