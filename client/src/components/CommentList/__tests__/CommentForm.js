import { render, shallow } from 'enzyme';

import CommentForm from '../CommentForm';

describe('<CommentForm/>', () => {
  it('should render properly', () => {
    const wrapper = render(<CommentForm onSubmit={() => null}/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('should pass comment to parent on submit', () => {
    const spy = jest.fn();
    const wrapper = shallow(<CommentForm onSubmit={spy}/>);

    wrapper.find('.commentform').find('button').simulate('click');
    wrapper.update();
  });
});
