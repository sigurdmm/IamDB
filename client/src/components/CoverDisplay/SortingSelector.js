import PropTypes from 'prop-types';
import React from 'react';

const SortingSelector = ({ sortingMethods, onSort }) => <select name="select" onChange={event => onSort(event)}>
    {sortingMethods.map((method, i) => (
      <option
        key={i}
        value={method}
      >
        {method}
      </option>))}
  </select>;

SortingSelector.propTypes = {
  onSort: PropTypes.func.isRequired,
  sortingMethods: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default SortingSelector;
