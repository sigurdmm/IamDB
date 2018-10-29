import { FETCH_POSTS } from './actions/postActions';

const initialState = {
  items: [],
  item: {},
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
