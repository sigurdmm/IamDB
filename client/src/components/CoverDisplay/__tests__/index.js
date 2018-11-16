import { render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import CoverDisplay from '../index';

const mockedMedia = [
  {
    name: 'title1',
    id: '1',
    thumbnails: {
      small: 'https://example.com/test.jpg',
    },
  },
  {
    name: 'name3',
    id: '2',
    thumbnails: {
      small: 'https://example.com/test2.png',
    },
  },
  {
    name: 'title3',
    id: '3',
    thumbnails: {},
  },
];

describe('<CoverDisplay/>', () => {
  it('should render list properly', () => {
    const wrapper = render(<MemoryRouter>
      <CoverDisplay onSort={jest.fn()} hasSearched={false} media={mockedMedia} loading={true}/>
    </MemoryRouter>);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render error message properly', () => {
    const wrapper = render(<MemoryRouter>
      <CoverDisplay onSort={jest.fn()} hasSearched={false} media={[]} loading={true}/>
    </MemoryRouter>);

    expect(wrapper).toMatchSnapshot();
  });
});
