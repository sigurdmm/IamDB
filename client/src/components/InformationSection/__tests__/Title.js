import React from 'react';
import { render } from 'enzyme/build';
import Title from '../Title';

describe('<Title/>', () => {
  it('should render title', () => {
    const wrapper = render(<Title title='media title'/>);

    expect(wrapper).toMatchSnapshot();
  });
});
