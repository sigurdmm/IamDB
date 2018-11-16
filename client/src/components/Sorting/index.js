import React from 'react';
import PropTypes from 'prop-types';
import SortingSelector from './SortingSelector';
import './index.less';

const Sorting = ({
  directionValue,
  onDirectionClick,
  sortingMethods,
  onSort,
  fieldValue,
}) => <div className='sortingbar'>
    <SortingSelector
      sortingMethods={sortingMethods}
      onSort={onSort}
      fieldValue={fieldValue}
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
  fieldValue: PropTypes.string.isRequired,
  onDirectionClick: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sortingMethods: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default Sorting;
