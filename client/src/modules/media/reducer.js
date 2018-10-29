import { FETCH_MEDIA_DETAILS } from './constants';

const initialState = {
  allMedia: [],
  detailedMedia: {
    id: -1,
    name: '',
    description: '',
    actors: []
  },
  error: null,
};

export default function mediaReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_MEDIA_DETAILS:
      return {
        ...state,
        detailedMedia: action.payload,
      };
    default:
      return state;
  }
}
