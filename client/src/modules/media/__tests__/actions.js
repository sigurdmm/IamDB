
import { fetchMediaById } from '../actions';

describe('fetchMediaById', () => {
  it('should dispatch with media.id as payload', () => {
    const expectedId = 1;
    const mockedDispatch = jest.fn();

    fetchMediaById(expectedId)(mockedDispatch);

    expect(mockedDispatch).toHaveBeenCalled();
    expect(mockedDispatch.mock.calls[0][0].media.id).toBe(expectedId);
  });
});
