import { render } from 'enzyme';

import InformationSection from '../index';

const mockedDetails = {
  thumbnails: {
    small: 'image',
  },
  name: 'title',
  rating: 8.8,
  type: 'movie',
  director: 'director',
};

describe('<InformationSection/>', () => {
  it('should render properly', () => {
    const wrapper = render(<InformationSection details={mockedDetails}/>);

    expect(wrapper).toMatchSnapshot();
  });
});
