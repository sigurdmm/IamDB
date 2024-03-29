import mediaReducer, { initialState } from '../reducer';
import {
  ADD_MEDIA_COMMENT_FAILED,
  ADD_MEDIA_COMMENT_REQUESTED,
  ADD_MEDIA_COMMENT_SUCCESS,
  FETCH_MEDIA_DETAILS_FAILED,
  FETCH_MEDIA_DETAILS_REQUESTED,
  FETCH_MEDIA_DETAILS_SUCCESS,
  SEARCH_MEDIA_FAILED, SEARCH_MEDIA_REQUESTED,
  SEARCH_MEDIA_SUCCESS, UPDATE_SEARCH_FIELDS,
} from '../constants';

describe('mediaReducer', () => {
  it('should return same state on unknown branch', () => {
    const newState = mediaReducer(initialState, { type: '' });

    expect(newState).toEqual(initialState);
  });
});

describe('mediaReducer: search', () => {
  it('should set loading to true on search', () => {
    const newState = mediaReducer(
      initialState,
      {
        type: SEARCH_MEDIA_REQUESTED,
        query: {},
      },
    );

    expect(newState.loading).toBe(true);
  });

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

describe('mediaReducer: add comment', () => {
  it('should refresh detailedMedia on success', () => {
    const media = {
      name: 'hello world',
    };

    const newState = mediaReducer(
      initialState,
      {
        media,
        type: ADD_MEDIA_COMMENT_SUCCESS,
      },
    );

    expect(newState.detailedMedia).toEqual(media);
  });

  it('should set loading to true on post', () => {
    const newState = mediaReducer(
      initialState,
      {
        type: ADD_MEDIA_COMMENT_REQUESTED,
      },
    );

    expect(newState.loading).toBe(true);
  });

  it('should clear error on success', () => {
    const newState = mediaReducer(
      Object.assign(initialState, { error: 'some error', loading: true }),
      {
        type: ADD_MEDIA_COMMENT_SUCCESS,
        media: {},
      },
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
  });

  it('should store error in redux on error', () => {
    const newState = mediaReducer(
      Object.assign(initialState, { loading: true }),
      {
        type: ADD_MEDIA_COMMENT_FAILED,
        error: 'some error',
      },
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('some error');
  });
});

describe('mediaReducer: update search fields', () => {
  it('should update the given field in the redux store', () => {
    const newState = mediaReducer(
      initialState,
      {
        type: UPDATE_SEARCH_FIELDS,
        fields: { type: 'test' },
      },
    );

    expect(newState.type).toBe('test');
  });
});
