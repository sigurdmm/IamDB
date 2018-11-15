import PropTypes from 'prop-types';

import CommentForm from './CommentForm';
import Comment from './Comment';

import './index.less';

const CommentList = ({ comments, onSubmit }) => <div className="commentlist">
  <ul className="commentlist__list">
    {comments.map((comment, idx) => <li key={`comment-${idx}`}>
      <Comment createdAt={comment.createdAt}>{comment.text}</Comment>
    </li>)}
  </ul>
  <CommentForm onSubmit={onSubmit}/>
</div>;

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    createdAt: PropTypes.any,
    text: PropTypes.string.isRequired,
  })),
  onSubmit: PropTypes.func.isRequired,
};

export default CommentList;
