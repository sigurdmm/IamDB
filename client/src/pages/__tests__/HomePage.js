import { shallow } from 'enzyme';

// Note we're not using the default exported version
import { HomePage } from '../HomePage';

describe('<HomePage/>', () => {
  it('should render properly', () => {
    const spy = jest.fn();
    const wrapper = shallow(<HomePage
      allMedia={[]}
      loading={false}
      error={null}
      hasSearched={false}
      searchMedia={spy}/>);

    expect(wrapper).toBeTruthy();
  });

  it('should call action on submit', () => {
    const spy = jest.fn();
    const wrapper = shallow(<HomePage
      allMedia={[]}
      loading={false}
      error={null}
      hasSearched={false}
      searchMedia={spy}/>);

    const query = 'The Dark Knight';

    wrapper.instance().onSearchSubmit(query);

    expect(spy.mock.calls[0][0]).toBe(query);
  });
});
