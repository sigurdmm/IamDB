import { render } from 'enzyme';

import Header from '../index';

describe('<Header/>', () => {
  it('renders without children', () => {
    const wrapper = render(<Header title="Hello world"/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with children', () => {
    const wrapper = render(<Header title="Hello world">
      <nav>
        <a href="#1">Link 1</a>
        <a href="#2">Link 2</a>
      </nav>
    </Header>);

    expect(wrapper).toMatchSnapshot();
  });
});
