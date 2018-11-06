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

  it('functions should be called on press', () => {
    const spy = jest.fn();
    const wrapper = shallow(<ToggleButtonGroup
      toggled={mockedState.toggled}
      onToggle={spy}
      buttons={mockedState.buttons}/>);
    wrapper.find('button').at(1).simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
