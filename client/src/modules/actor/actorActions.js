import {
  FETCH_ACTOR_DETAILS_REQUESTED,
} from './constants';

// eslint-disable-next-line import/prefer-default-export
export const fetchActorById = id => dispatch => dispatch({
  actor: { id },
  type: FETCH_ACTOR_DETAILS_REQUESTED,
});
