import { shallow } from 'enzyme';

import AlertBar from '../index';


describe('<AlertBar/>', () => {
  it('should render properly', () => {
    const wrapper = shallow(<AlertBar
      message={''}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
