import PropTypes from 'prop-types';
import Select from 'react-select';
import React from 'react';

const options = [
  { value: 'all', label: 'All' },
  { value: 'movies', label: 'Movies' },
  { value: 'series', label: 'TV Shows' },
];

export default class MediaTypeSelector extends React.Component {
  static propTypes = {
    selectedMediaType: PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
    onSelectorChange: PropTypes.func.isRequired,
  };

  render() {
    return <Select
      value={this.props.selectedMediaType}
      onChange={obj => this.props.onSelectorChange(obj)}
      options={options}
    />;
  }
}
