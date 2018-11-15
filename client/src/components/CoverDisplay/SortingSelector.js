import PropTypes from 'prop-types';
import React from 'react';

const SortingSelector = ({
  sortingMethods,
  onSort,
}) => {
  // If onSort is false don't render SortingSelector
  // || typeof onSortDirection === 'undefined'
  if (typeof onSort === 'undefined') {
    return null;
  }

  return <div>
    <select name="select" onChange={event => onSort(event.target.value)}>
    {sortingMethods.map((method, i) => (
      <option
        key={i}
        value={method.value}
      >
        {method.label}
      </option>))}
    </select>
  </div>;
};

SortingSelector.propTypes = {
  onSort: PropTypes.func,
  sortingMethods: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default SortingSelector;
