import { render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import CoverImage from '../CoverImage';

describe('<CoverImage/>', () => {
  it('should render img, when link exists', () => {
    const wrapper = render(<MemoryRouter>
      <CoverImage rating={5} title={'title'} thumbnail="https://example.com/test.jpg" url='url'/>
    </MemoryRouter>);

    expect(wrapper).toMatchSnapshot();
  });
  it('should render img, when link does not exist', () => {
    const wrapper = render(<MemoryRouter>
      <CoverImage rating={3} title={'title'} thumbnail={null} url='url'/>
    </MemoryRouter>);

    expect(wrapper).toMatchSnapshot();
  });
});
