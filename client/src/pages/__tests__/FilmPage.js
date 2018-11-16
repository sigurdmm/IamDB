import { render, mount } from 'enzyme';

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
  it('should render properly when loading', () => {
    const spy = jest.fn();
    const wrapper = render(<FilmPage
      fetchMediaById={spy}
      addComment={() => null}
      detailedMedia={mockedDetails}
      loading={true}
      error={null}
    />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render properly when error', () => {
    const spy = jest.fn();
    const wrapper = render(<FilmPage
      fetchMediaById={spy}
      addComment={() => null}
      detailedMedia={mockedDetails}
      loading={false}
      error={'ERROR'}
    />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should fetch detailed media', () => {
    const id = 1337;

    const spy = jest.fn();
    mount(<FilmPage
      fetchMediaById={spy}
      addComment={() => null}
      match={{
        params: { id },
      }}
      detailedMedia={mockedDetails}
      loading={false}
      error={null}/>);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(id);
  });
});
