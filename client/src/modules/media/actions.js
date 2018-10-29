import { FETCH_MEDIA_DETAILS, FETCH_MEDIA_DETAILS_REQUESTED } from './constants';

export const fetchMediaById = id => dispatch => dispatch({
  media: { id },
  type: FETCH_MEDIA_DETAILS_REQUESTED,
});

export const fetchMediaDetails = id => (dispatch) => {
  fetch(`/api/v1/media/${id}`)
    .then(res => res.json())
    .then(payload => dispatch({
      payload,
      type: FETCH_MEDIA_DETAILS,
    }));
};
