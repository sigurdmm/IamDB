import React from 'react';
import { shallow } from 'enzyme';

import ToggleButtonGroup from '../ToggleButtonGroup';

const mockedState = {
  buttons: [
    { label: 'label1', value: 'value1' },
    { label: 'label2', value: 'value2' },
    { label: 'label3', value: 'value3' }],
  toggled: { label: 'label1', value: 'value1' },
  onToggle: jest.fn(),
};

describe('<ToggleButtonGroup/>', () => {
  it('should load properly', () => {
    const wrapper = shallow(<ToggleButtonGroup
      toggled={mockedState.toggled}
      onToggle={mockedState.onToggle}
      buttons={mockedState.buttons}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onToggle on change', () => {
    const spy = jest.fn();
    const wrapper = shallow(<ToggleButtonGroup
      toggled={mockedState.toggled}
      onToggle={spy}
      buttons={mockedState.buttons}/>);
    wrapper.find('ToggleButton').at(2).simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should not call onToggle if already selected', () => {
    const spy = jest.fn();

    const wrapper = shallow(<ToggleButtonGroup
      toggled={mockedState.toggled}
      onToggle={spy}
      buttons={mockedState.buttons}
    />);
    wrapper.find('ToggleButton').at(0).simulate('click');
    wrapper.find('ToggleButton').at(0).simulate('click');

    expect(spy).not.toHaveBeenCalled();
  });
});
