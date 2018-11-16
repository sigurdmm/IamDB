import {

  FETCH_ACTOR_DETAILS_FAILED,
  FETCH_ACTOR_DETAILS_REQUESTED,
  FETCH_ACTOR_DETAILS_SUCCESS,

} from './constants';

const initialState = {
  detailedActor: {
    id: -1,
    name: '',
    media: [],
    thumbnails: {},
  },
  loading: true,
  error: null,
};

export default function actorReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACTOR_DETAILS_REQUESTED:
      return {
        ...state,
        detailedActor: Object.assign(initialState.detailedActor, { id: action.actor.id }),
        loading: true,
        error: null,
      };
    case FETCH_ACTOR_DETAILS_SUCCESS:
      return {
        ...state,
        detailedActor: action.actor,
        loading: false,
        error: null,
      };
    case FETCH_ACTOR_DETAILS_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
