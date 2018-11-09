import React from 'react';
import { shallow } from 'enzyme';

import ToggleButtonGroup from '../ToggleButtonGroup';

const mockedState = {
  toggled: 0,
  buttons: [{ content: 'Movie' }, { content: 'TV Show' }],
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
    wrapper.find('ToggleButton').at(1).simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should not call onToggle if already selected', () => {
    const spy = jest.fn();

    const wrapper = shallow(<ToggleButtonGroup
      toggled={0}
      onToggle={spy}
      buttons={mockedState.buttons}
    />);

    wrapper.find('ToggleButton').at(0).simulate('click');

    expect(spy).not.toHaveBeenCalled();
  });
});
