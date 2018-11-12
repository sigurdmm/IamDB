import React from 'react';
import { render } from 'enzyme/build';
import MediaType from '../MediaType';

const mockedTypes = {
  existingType: 'Existing type',
  noType: {},
};

describe('<MediaType/>', () => {
  it('should render type when type is set', () => {
    const wrapper = render(<MediaType type={mockedTypes.existingType}/>);

    expect(wrapper).toMatchSnapshot();
  });
  it('should render type when type is unknown', () => {
    const wrapper = render(<MediaType type={mockedTypes.noType}/>);

    expect(wrapper).toMatchSnapshot();
  });
});
