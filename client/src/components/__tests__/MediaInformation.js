import { render } from 'enzyme';

import MediaInformation from '../MediaInformation';

const mockedDetails = {
  thumbnails: {
    small: 'image',
  },
  name: 'title',
  rating: 8.8,
  director: 'director',
  type: 'movie',
};

describe('<MediaInformation/>', () => {
  it('should render properly', () => {
    const wrapper = render(<MediaInformation details={mockedDetails}/>);

    expect(wrapper).toMatchSnapshot();
  });
});
