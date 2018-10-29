import {
  FETCH_MEDIA_DETAILS_FAILED,
  FETCH_MEDIA_DETAILS_REQUESTED,
  FETCH_MEDIA_DETAILS_SUCCESS
} from './constants';

const initialState = {
  allMedia: [],
  detailedMedia: {
    id: -1,
    name: '',
    description: '',
    actors: []
  },
  loading: false,
  error: null,
};

export default function mediaReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_MEDIA_DETAILS_REQUESTED:
      const { id } = action.media;

      return {
        ...state,
        // Initial media object, with the requesting id
        detailedMedia: Object.assign(initialState.detailedMedia, { id }),
        loading: true,
      };
    case FETCH_MEDIA_DETAILS_SUCCESS:
      return {
        ...state,
        detailedMedia: action.media,
        loading: false,
      };
    case FETCH_MEDIA_DETAILS_FAILED:
      const { error } = action;
      return {
        ...state,
        error,
        loading: false,
      };
    default:
      return state;
  }
}
