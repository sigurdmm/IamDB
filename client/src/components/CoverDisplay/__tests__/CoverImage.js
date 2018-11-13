import { render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import CoverImage from '../CoverImage';

describe('<CoverImage/>', () => {
  it('should render img, when link exists', () => {
    const wrapper = render(<MemoryRouter>
      <CoverImage link="https://example.com/test.jpg" id='1'/>
    </MemoryRouter>);

    expect(wrapper).toMatchSnapshot();
  });
  it('should render img, when link does not exist', () => {
    const wrapper = render(<MemoryRouter>
      <CoverImage link={null} id='1'/>
    </MemoryRouter>);

    expect(wrapper).toMatchSnapshot();
  });
});
