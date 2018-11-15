import { render } from 'enzyme';

import Comment from '../Comment';

describe('<Comment/>', () => {
  it('should render properly', () => {
    const wrapper = render(<Comment createdAt={'1542296465964'}>Hello world</Comment>);

    expect(wrapper).toMatchSnapshot();
  });
});
