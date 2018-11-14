import Pagination from 'react-js-pagination';
import PropTypes from 'prop-types';

import './index.less';

const pageToOffset = (page, limit) => (page - 1) * limit;
const offsetToPage = (offset, limit) => (offset / limit) + 1;

const Paginator = (props) => {
  const {
    offset,
    limit,
    total,
    onPagination,
  } = props;
  console.info(`offset: ${offset}, limit: ${limit}, total: ${total}`);

  const pageCount = 5;

  return <Pagination activePage={offsetToPage(offset, limit)}
                     totalItemsCount={total}
                     itemsCountPerPage={limit}
                     pageRangeDisplayed={pageCount}
                     onChange={page => onPagination(pageToOffset(page, limit))}/>;
};

Paginator.propTypes = {
  offset: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPagination: PropTypes.func.isRequired,
};

export default Paginator;
