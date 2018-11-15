import { render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Header from '../index';

describe('<Header/>', () => {
  it('renders without children', () => {
    const wrapper = render(<MemoryRouter><Header title="Hello world"/></MemoryRouter>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with children', () => {
    const wrapper = render(<MemoryRouter>
      <Header title="Hello world">
        <nav>
          <a href="#1">Link 1</a>
          <a href="#2">Link 2</a>
        </nav>
      </Header>
    </MemoryRouter>);

    expect(wrapper).toMatchSnapshot();
  });
});
