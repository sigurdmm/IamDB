import React from 'react';
import './ToggleButtonGroup.less';
import PropTypes from 'prop-types';

export default class ToggleButtonGroup extends React.Component {
  static propTypes = {
    toggled: PropTypes.number.isRequired,
    buttons: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.string.isRequired,
    })),
    onToggle: PropTypes.func.isRequired,
  };

  render() {
    const buttons = this.props.buttons.map(
      (button, i) => <button
        key={i}
        onClick={this.props.onToggle(i)}
        className={this.props.toggled === i
          ? 'togglebuttons__button togglebuttons__button__toggled'
          : 'togglebuttons__button'}
      >
        {button.content}
      </button>,
    );
    return <div className="togglebuttons">
      {buttons}
    </div>;
  }
}
