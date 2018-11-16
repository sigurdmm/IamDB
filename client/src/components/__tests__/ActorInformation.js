import { render } from 'enzyme';

import ActorInformation from '../ActorInformation';

const mockedDetails = {
  thumbnails: {
    small: 'image',
  },
  name: 'title',
  popularity: 8.8,
};

describe('<ActorInformation/>', () => {
  it('should render properly', () => {
    const wrapper = render(<ActorInformation details={mockedDetails}/>);

    expect(wrapper).toMatchSnapshot();
  });
});
