import { shallow } from 'enzyme';

import ApplicationAnimationCover from '../index';

describe('<ApplicationAnimationCover/>', () => {
  it('should select a cover image', () => {
    const wrapper = shallow(<ApplicationAnimationCover/>);

    const { style } = wrapper.props();

    expect(style.backgroundImage.startsWith('background-image: ')).toBeTruthy();

    const coverUrl = style.backgroundImage.replace('background-image: ', '');

    // After stripping the property, expect an url to exists
    expect(coverUrl).toBeTruthy();
  });
});
