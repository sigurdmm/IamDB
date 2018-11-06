import React from 'react';
import { shallow } from 'enzyme';

import Index from '../SearchBar/index';

describe('<Index/>', () => {
  it('should load properly', () => {
    const wrapper = shallow(<Index onSubmit={jest.fn()}/>);

    expect(wrapper).toMatchSnapshot();
  });
});
