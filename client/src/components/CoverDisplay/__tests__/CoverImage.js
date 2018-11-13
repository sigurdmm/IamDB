import { render } from 'enzyme';

import CoverImage from '../CoverImage';

describe('<CoverImage/>', () => {
  it('should render img, when link exists', () => {
    const wrapper = render(<CoverImage title={'Title'} thumbnail="https://example.com/test.jpg"/>);

    expect(wrapper).toMatchSnapshot();
  });
});
