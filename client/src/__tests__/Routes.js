import { shallow } from 'enzyme';

import Routes from '../Routes';

describe('<Router/>', () => {
  it('renders properly', () => {
    const wrapper = shallow(<Routes/>);

    expect(wrapper).toMatchSnapshot();
  });
});
