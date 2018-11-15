import { render } from 'enzyme';

// Note we're not using the default exported version
import { ActorPage } from '../ActorPage';

const mockedDetails = {
  id: -1,
  name: '',
  thumbnails: {},
  media: [],
  popularity: 0,
};

describe('<ActorPage/>', () => {
  it('should render properly', () => {
    const spy = jest.fn();
    const wrapper = render(<ActorPage
      fetchActorById={spy}
      detailedActor={mockedDetails}
      loading={false}
      error={null}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
