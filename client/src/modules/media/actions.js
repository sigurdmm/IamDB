
import { FETCH_MEDIA_DETAILS } from './constants';

export const fetchMediaDetails = (id) => (dispatch) => {
  fetch(`/api/v1/media/${id}`)
    .then(res => res.json())
    .then(payload => dispatch({
      payload,
      type: FETCH_MEDIA_DETAILS,
    }));
};
