import { MemoryRouter } from 'react-router-dom';
import { mount, render } from 'enzyme';

// Note we're not using the default exported version
import { ActorPage } from '../ActorPage';

const mockedDetails = {
  id: -1,
  name: '',
  thumbnails: {},
  media: [{
    name: 'movie',
    director: 'director',
  }],
  popularity: 0,
};

describe('<ActorPage/>', () => {
  it('should render properly', () => {
    const mockedDetailsNoDirector = Object.assign(mockedDetails, {});
    // Remove directors
    mockedDetailsNoDirector.media.map(m => Object.assign(m, { director: null }));

    const spy = jest.fn();
    const wrapper = render(<MemoryRouter>
      <ActorPage
        fetchActorById={spy}
        detailedActor={mockedDetailsNoDirector}
        loading={false}
        error={null}
      />
    </MemoryRouter>);

    expect(wrapper).toMatchSnapshot();
  });
  it('should render properly when loading', () => {
    const spy = jest.fn();
    const wrapper = render(<MemoryRouter><ActorPage
      fetchActorById={spy}
      detailedActor={mockedDetails}
      loading={true}
      error={null}
    /></MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render properly when error', () => {
    const spy = jest.fn();
    const wrapper = render(<MemoryRouter><ActorPage
      fetchActorById={spy}
      detailedMedia={mockedDetails}
      loading={false}
      error={true}
    /></MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });
  it('should fetch detailedActor', () => {
    const id = 1337;
    const spy = jest.fn();
    mount(<MemoryRouter><ActorPage
      fetchActorById={spy}
      match={{
        params: { id },
      }}
      detailedActor={mockedDetails}
      loading={false}
      error={null}
    /></MemoryRouter>);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(id);
  });
});
