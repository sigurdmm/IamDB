
import { fetchActorById } from '../actorActions';

describe('fetchActorById', () => {
  it('should dispatch with actor.id as payload', () => {
    const expectedId = 1;
    const mockedDispatch = jest.fn();

    fetchActorById(expectedId)(mockedDispatch);

    expect(mockedDispatch).toHaveBeenCalled();
    expect(mockedDispatch.mock.calls[0][0].actor.id).toBe(expectedId);
  });
});
