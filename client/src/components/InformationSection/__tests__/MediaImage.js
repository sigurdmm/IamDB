import { render } from 'enzyme/build';
import MediaImage from '../MediaImage';

const mockedImage = {
  thumbnails: {
    small: 'https://example.com/test.jpg',
  },
  noThumbnails: {},
};

describe('<MediaImage/>', () => {
  it('should render img, when link exists', () => {
    const wrapper = render(<MediaImage image={mockedImage.thumbnails}/>);

    expect(wrapper).toMatchSnapshot();
  });
  it('should render default img, when link does not exist ', () => {
    const wrapper = render(<MediaImage image={mockedImage.noThumbnails}/>);

    expect(wrapper).toMatchSnapshot();
  });
});
