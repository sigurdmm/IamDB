import React from 'react';
import PropTypes from 'prop-types';
import SortingSelector from './SortingSelector';
import './index.less';

const Sorting = ({
  directionValue,
  onDirectionClick,
  sortingMethods,
  onSort,
  visible,
}) => <div className={visible ? 'sortingbar' : 'sortingbar__hidden'}>
    <SortingSelector
      sortingMethods={sortingMethods}
      onSort={onSort}
    />
    <button
      className='sortingbar__direction'
      value={directionValue}
      onClick={() => {
        onDirectionClick(directionValue === -1 ? 1 : -1);
      }}
    >
      {directionValue === -1 ? '▼' : '▲'}
    </button>
  </div>;

Sorting.propTypes = {
  directionValue: PropTypes.number.isRequired,
  onDirectionClick: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  sortingMethods: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default Sorting;
