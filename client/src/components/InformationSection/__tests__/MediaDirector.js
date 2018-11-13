import React from 'react';
import { render } from 'enzyme/build';
import MediaDirector from '../MediaDirector';

const mockedDirectors = {
  existingDirector: 'Existing Director',
};

describe('<MediaDirector/>', () => {
  it('should render director when director is set', () => {
    const wrapper = render(<MediaDirector director={mockedDirectors.existingDirector}/>);

    expect(wrapper).toMatchSnapshot();
  });
});
