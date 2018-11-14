import React, { PureComponent } from 'react';
import './ToggleButtonGroup.less';
import PropTypes from 'prop-types';

const ToggleButton = ({ children, onClick, active }) => <button
  onClick={onClick}
  className={`togglebuttons__button${active ? ' togglebuttons__button--toggled' : ''}`}>{children}</button>;

ToggleButton.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default class ToggleButtonGroup extends PureComponent {
  static propTypes = {
    toggled: PropTypes.number.isRequired,
    buttons: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })),
    onToggle: PropTypes.func.isRequired,
  };

  onChange = id => () => {
    if (id === this.props.toggled) {
      return;
    }
    this.props.onToggle(id);
  };

  render() {
    return <div className="togglebuttons">
      {this.props.buttons.map((button, i) => <ToggleButton
        key={`togglebutton-${i}`}
        active={this.props.toggled === i}
        onClick={this.onChange(i)}>{button.label}</ToggleButton>)}
    </div>;
  }
}
