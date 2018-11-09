import { render } from 'enzyme';

import CoverDisplay from '../index';

const mockedMedia = [
  {
    thumbnails: {
      small: 'https://example.com/test.jpg',
    },
  },
  {
    thumbnails: {
      small: 'https://example.com/test2.png',
    },
  },
  {
    thumbnails: {},
  },
];

describe('<CoverDisplay/>', () => {
  it('should render list properly', () => {
    const wrapper = render(<CoverDisplay media={mockedMedia}/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render error message properly', () => {
    const wrapper = render(<CoverDisplay media={[]}/>);

    expect(wrapper).toMatchSnapshot();
  });
});
