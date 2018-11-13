import { shallow } from 'enzyme';

import ApplicationAnimationCover from '../index';

describe('<ApplicationAnimationCover/>', () => {
  it('should select a cover image', () => {
    const wrapper = shallow(<ApplicationAnimationCover/>);

    const { style } = wrapper.props();
    const coverImage = style.backgroundImage;

    expect(coverImage.length).toBeTruthy();

    // Should contain the url function
    expect(coverImage.includes('url(')).toBeTruthy();
  });
});
