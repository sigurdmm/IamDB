import {
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
  limit: 10,
  offset: 0,
  type: null,
  query: null,
  sort: {},
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
  /**
   * Denotes whether search is ongoing.
   * Defaults to true, to let the system
   * known that no information can be expected to be found in allMedia or detailedMedia.
   * */
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
        sort: action.query.sort || state.sort,
        hasSearched: true,
        loading: true,
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
