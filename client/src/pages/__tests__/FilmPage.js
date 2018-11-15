import { render } from 'enzyme';

// Note we're not using the default exported version
import { FilmPage } from '../FilmPage';

const mockedDetails = {
  id: -1,
  name: '',
  description: '',
  director: '',
  type: 'movie',
  thumbnails: {},
  actors: [],
};

describe('<FilmPage/>', () => {
  it('should render properly', () => {
    const spy = jest.fn();
    const wrapper = render(<FilmPage
      fetchMediaById={spy}
      addComment={() => null}
      detailedMedia={mockedDetails}
      loading={false}
      error={null}/>);

    expect(wrapper).toMatchSnapshot();
  });
});
