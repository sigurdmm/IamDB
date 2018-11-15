import { render } from 'enzyme';

import CommentList from '../index';

const comments = [
  {
    createdAt: '1542296465964',
    text: 'Hello world',
  },
  {
    createdAt: '1542296465974',
    text: 'Hello world 2',
  },
];

describe('<CommentList/>', () => {
  it('should render without comments', () => {
    const wrapper = render(<CommentList comments={[]} onSubmit={() => null}/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render list of comments', () => {
    const wrapper = render(<CommentList comments={comments} onSubmit={() => null}/>);

    expect(wrapper).toMatchSnapshot();
  });
});
