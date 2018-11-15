import React from 'react';
import PropTypes from 'prop-types';
import SortingSelector from '../CoverDisplay/SortingSelector';

// [{ label: 'Rating', value: 'rating' },
//   { label: 'Year', value: 'released' },
//   { label: 'Name', value: 'name' },
// ]

const Sorting = ({
  directionValue,
  onDirectionClick,
  sortingMethods,
  onSort,
}) => <div>
    <SortingSelector
      sortingMethods={sortingMethods}
       onSort={onSort}
    />
    <button
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
  sortingMethods: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default Sorting;
