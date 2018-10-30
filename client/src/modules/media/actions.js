import { FETCH_MEDIA_DETAILS_REQUESTED } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const fetchMediaById = id => dispatch => dispatch({
  media: { id },
  type: FETCH_MEDIA_DETAILS_REQUESTED,
});
