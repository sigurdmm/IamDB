import {
  ADD_MEDIA_COMMENT_FAILED,
  ADD_MEDIA_COMMENT_REQUESTED, ADD_MEDIA_COMMENT_SUCCESS,
  FETCH_MEDIA_DETAILS_FAILED,
  FETCH_MEDIA_DETAILS_REQUESTED,
  FETCH_MEDIA_DETAILS_SUCCESS,

  SEARCH_MEDIA_FAILED,
  SEARCH_MEDIA_REQUESTED,
  SEARCH_MEDIA_SUCCESS,
  UPDATE_SEARCH_FIELDS,

} from './constants';

const initialState = {
  /**
   * Object containing the search metadata
   * */
  limit: 8,
  offset: 0,
  type: null,
  query: null,
  sortDirection: -1,
  sortField: 'rating',
  total: 0,
  /**
   * Array containing a list of media.
   * */
  allMedia: [],
  /**
   * Object containing a specific medi.a
   * */
  detailedMedia: {
    id: -1,
    name: '',
    description: '',
    type: 'movie',
    actors: [],
    thumbnails: {},
  },
  loading: true,
  error: null,
  /**
   * Denotes if the user has begun searching,
   * will always stay true after the first search.
   * */
  hasSearched: false,
};

export default function mediaReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MEDIA_DETAILS_REQUESTED:
      return {
        ...state,
        // Initial media object, with the requesting id
        detailedMedia: Object.assign(state.detailedMedia, { id: action.media.id }),
        loading: true,
        hasSearched: true,
      };
    case FETCH_MEDIA_DETAILS_SUCCESS:
      return {
        ...state,
        detailedMedia: action.media,
        loading: false,
        error: null,
      };
    case FETCH_MEDIA_DETAILS_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case SEARCH_MEDIA_SUCCESS:
      return {
        ...state,
        allMedia: action.media,
        total: action.metadata.total,
        loading: false,
        error: null,
      };
    case SEARCH_MEDIA_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case SEARCH_MEDIA_REQUESTED:
      return {
        ...state,
        query: action.query.query || state.query,
        type: action.query.type || state.type,
        limit: action.query.limit || state.limit,
        offset: action.query.offset || state.offset,
        sortField: action.query.sortField || state.sortField,
        sortDirection: action.sortDirection || state.sortDirection,
        hasSearched: true,
        loading: true,
      };
    case ADD_MEDIA_COMMENT_REQUESTED:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case ADD_MEDIA_COMMENT_SUCCESS:
      return {
        ...state,
        detailedMedia: action.media,
        error: null,
        loading: false,
      };

    case ADD_MEDIA_COMMENT_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case UPDATE_SEARCH_FIELDS:
      return {
        ...state,
        ...action.fields,
      };
    default:
      return state;
  }
}
