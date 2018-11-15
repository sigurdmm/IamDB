import PropTypes from 'prop-types';

import { dateToHuman } from '../../utils/dateUtil';
import './Comment.less';

const Comment = ({ createdAt, children }) => <div className="comment">
    <strong className="comment__published">
      Published: <em>{dateToHuman(new Date(parseInt(createdAt, 10)))}</em>
    </strong>
    <p className="comment__text">{children}</p>
  </div>;
Comment.propTypes = {
  createdAt: PropTypes.any,
  children: PropTypes.string,
};

export default Comment;
