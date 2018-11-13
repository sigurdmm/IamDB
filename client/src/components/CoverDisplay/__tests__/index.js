import { render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import CoverDisplay from '../index';

const mockedMedia = [
  {
    id: '1',
    thumbnails: {
      small: 'https://example.com/test.jpg',
    },
  },
  {
    id: '2',
    thumbnails: {
      small: 'https://example.com/test2.png',
    },
  },
  {
    id: '3',
    thumbnails: {},
  },
];

describe('<CoverDisplay/>', () => {
  it('should render list properly', () => {
    const wrapper = render(<MemoryRouter>
      <CoverDisplay hasSearched={false} media={mockedMedia}/>
    </MemoryRouter>);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render error message properly', () => {
    const wrapper = render(<MemoryRouter>
      <CoverDisplay hasSearched={false} media={[]}/>
    </MemoryRouter>);

    expect(wrapper).toMatchSnapshot();
  });
});
