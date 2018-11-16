import { shallow } from 'enzyme';

import Sorting from '../index';


describe('<Sorting/>', () => {
  it('should render properly', () => {
    const wrapper = shallow(<Sorting
      directionValue={1}
      onSort={jest.fn()}
      onDirectionClick={jest.fn()}
      fieldValue={''}
      sortingMethods={ [{ label: 'label', value: 'value' }, { label: 'label2', value: 'value2' }] }
      visible={true}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should call onDirectionClick on click', () => {
    const spy = jest.fn();

    const wrapper = shallow(<Sorting
        directionValue={1}
        onSort={jest.fn()}
        onDirectionClick={spy}
        fieldValue={''}
        sortingMethods={ [{ label: 'label', value: 'value' }] }
        visible={true}
      />);

    wrapper.find('button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
