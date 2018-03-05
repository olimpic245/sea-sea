import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CellComponent extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    classColor: PropTypes.string.isRequired,
    cellClick: PropTypes.func.isRequired
  };

  onClick = () => {
    const { x, y } = this.props;
    this.props.cellClick(x, y);
  };

  render() {
    const { classColor } = this.props;

    return <div className={`Item ${classColor}`} onClick={this.onClick} />;
  }
}