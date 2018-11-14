import {
  FETCH_MEDIA_DETAILS_FAILED,
  FETCH_MEDIA_DETAILS_REQUESTED,
  FETCH_MEDIA_DETAILS_SUCCESS, SEARCH_MEDIA_FAILED, SEARCH_MEDIA_REQUESTED, SEARCH_MEDIA_SUCCESS,
} from './constants';

const initialState = {
  /**
   * Object containing the search metadata
   * */
  searchQuery: {
    limit: 50,
    offset: 0,
    type: null,
    query: null,
    total: 0,
  },
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
        searchQuery: Object.assign(state.searchQuery, action.metadata),
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
        searchQuery: Object.assign(state.searchQuery, {
          query: action.query.query,
          type: action.query.type,
        }),
        hasSearched: true,
        loading: true,
      };
    default:
      return state;
  }
}
