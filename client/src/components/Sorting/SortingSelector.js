import PropTypes from 'prop-types';
import React from 'react';

const SortingSelector = ({
  sortingMethods,
  onSort,
  fieldValue,
}) => <>
    <select
      name="select"
      className='sortingbar__type'
      onChange={event => onSort(event.target.value)}
      value = {fieldValue}
    >
    {sortingMethods.map((method, i) => (
      <option
        key={i}
        value={method.value}
      >
        {method.label}
      </option>))}
    </select>
  </>;

SortingSelector.propTypes = {
  onSort: PropTypes.func.isRequired,
  fieldValue: PropTypes.string.isRequired,
  sortingMethods: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default SortingSelector;
