import { shallow } from 'enzyme';

import SortingSelector from '../SortingSelector';


describe('<SortingSelector/>', () => {
  it('should render properly', () => {
    const wrapper = shallow(<SortingSelector
      fieldValue={''}
      onSort={jest.fn()}
      sortingMethods={ [{ label: 'label', value: 'value' }] }
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
