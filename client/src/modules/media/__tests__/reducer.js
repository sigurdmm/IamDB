import mediaReducer, { initialState } from '../reducer';
import {
  FETCH_MEDIA_DETAILS_FAILED,
  FETCH_MEDIA_DETAILS_REQUESTED,
  FETCH_MEDIA_DETAILS_SUCCESS,
  SEARCH_MEDIA_FAILED,
  SEARCH_MEDIA_SUCCESS,
} from '../constants';

describe('mediaReducer', () => {
  it('should return same state on unknown branch', () => {
    const newState = mediaReducer(initialState, { type: '' });

    expect(newState).toEqual(initialState);
  });
});

describe('mediaReducer: search', () => {
  it('should set loading to false on search success', () => {
    const newState = mediaReducer(
      Object.assign(initialState, { loading: true }),
      {
        type: SEARCH_MEDIA_SUCCESS,
        media: [],
        metadata: { total: 0 },
      },
    );

    expect(newState.loading).toBe(false);
  });

  it('should clear error after successful search', () => {
    const newState = mediaReducer(
      Object.assign(initialState, { error: 'some error' }),
      {
        type: SEARCH_MEDIA_SUCCESS,
        media: [],
        metadata: { total: 0 },
      },
    );

    expect(newState.error).toBe(null);
  });

  it('should store error in store on search error', () => {
    const newState = mediaReducer(
      Object.assign(initialState, { loading: true }),
      {
        type: SEARCH_MEDIA_FAILED,
        error: 'some error',
      },
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('some error');
  });
});

describe('mediaRecuer: get media', () => {
  it('should set loading to true on request', () => {
    const newState = mediaReducer(
      initialState,
      {
        type: FETCH_MEDIA_DETAILS_REQUESTED,
        media: { id: 0 },
      },
    );

    expect(newState.loading).toBe(true);
  });

  it('should set loading to false on load success', () => {
    const media = { name: 'test' };

    const newState = mediaReducer(
      Object.assign(initialState, { loading: true }),
      {
        media,
        type: FETCH_MEDIA_DETAILS_SUCCESS,
      },
    );

    expect(newState.detailedMedia).toEqual(media);
  });

  it('should store error in store on load error', () => {
    const newState = mediaReducer(
      Object.assign(initialState, { loading: true }),
      {
        type: FETCH_MEDIA_DETAILS_FAILED,
        error: 'some error',
      },
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('some error');
  });
});
