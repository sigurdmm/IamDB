import React from 'react';
import { render } from 'enzyme';

import App from '../App';

describe('<App/>', () => {
  it('should load properly', () => {
    const wrapper = render(<App/>);

    expect(wrapper).toMatchSnapshot();
  });
});
