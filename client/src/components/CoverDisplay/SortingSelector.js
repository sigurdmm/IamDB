import PropTypes from 'prop-types';
import React from 'react';

const SortingSelector = ({ sortingMethods, onSort }) => {
  // If onSort is false don't render SortingSelector
  if (onSort === false) {
    return null;
  }
  return <select name="select" onChange={event => onSort(event)}>
    {sortingMethods.map((method, i) => (
      <option
        key={i}
        value={method.value}
      >
        {method.label}
      </option>))}
  </select>;
};

SortingSelector.propTypes = {
  onSort: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]).isRequired,
  sortingMethods: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default SortingSelector;
