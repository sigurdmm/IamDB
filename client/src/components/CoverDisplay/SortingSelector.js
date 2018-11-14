import PropTypes from 'prop-types';
import React from 'react';

const SortingSelector = ({ sortingFactors, onSortSelect }) => <select name="select" onChange={event => onSortSelect(event)}>
    {sortingFactors.map((factor, i) => (
      <option
        key={i}
        value={factor}
      >
        {factor}
      </option>))}
  </select>;

SortingSelector.propTypes = {
  onSortSelect: PropTypes.func.isRequired,
  sortingFactors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default SortingSelector;
