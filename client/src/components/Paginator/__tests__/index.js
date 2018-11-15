import { render } from 'enzyme';

import Paginator from '../index';

describe('<Paginator/>', () => {
  it('should render properly', () => {
    const wrapper = render(<Paginator
      offset={0}
      limit={50}
      total={100}
      onPagination={() => null}/>);

    expect(wrapper).toMatchSnapshot();
  });
});
