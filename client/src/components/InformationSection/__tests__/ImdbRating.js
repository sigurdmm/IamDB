import React from 'react';
import { render } from 'enzyme';
import ImdbRating from '../ImdbRating';

const mockedRating = {
  existingRating: 8.8,
  noRating: {},
};

describe('<ImdbRating/>', () => {
  it('should render rating when rating is set', () => {
    const wrapper = render(<ImdbRating rating={mockedRating.existingRating}/>);

    expect(wrapper).toMatchSnapshot();
  });
});
