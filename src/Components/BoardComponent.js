import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CellComponent from './CellComponent';
import GridModel from '../Models/GridModel';

/**
 * Displays battlefield.
 */
export default class BoardComponent extends Component {
  static propTypes = {
    cellClick: PropTypes.func.isRequired,
    restartGame: PropTypes.func.isRequired,
    shipCount: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      shipCount: props.shipCount,
      color: this.emptyColors()
    };

    this.cellClick = this.cellClick.bind(this);
    this.restartClick = this.restartClick.bind(this);
  }

  emptyColors = () =>
    GridModel.getGrid().reduce(
      (accTotal, x, xIndex) =>
        x.reduce((acc, y, yIndex) => {
          accTotal[`${xIndex}::${yIndex}`] = 0;
          return accTotal;
        }),
      {}
    );

  /**
   * Restart handler.
   */
  restartClick() {
    this.setState((prevState, props) => ({
      shipCount: props.shipCount,
      color: this.emptyColors()
    }));

    this.props.restartGame();
  }

  /**
   * Click handler.
   *
   * @param {Number} x Coordinate X.
   * @param {Number} y Coordinate Y.
   */
  cellClick(x, y) {
    const key = `${x}::${y}`;

    if (this.state.color[key]) {
      return;
    }

    const Ship = GridModel.getPoint(x, y);
    const isHit = !!Ship;

    if (isHit) {
      Ship.addDamage();
    }

    const isKill = Ship && !Ship.isAlive();

    this.setState(({ shipCount, color }) => ({
      shipCount: isKill ? --shipCount : shipCount,
      color: { ...color, [key]: 1 }
    }));
    this.props.cellClick(isHit, isKill);
  }

  render() {
    const a = GridModel.getGrid();

    const items = [];

    for (const x in a) {
      for (const y in a[x]) {
        const cellKey = `${x}::${y}`;
        let classColor = 'Sea';
        if (this.state.color[cellKey]) {
          classColor = 'Miss';
          if (a[x][y]) {
            const ship = a[x][y];

            if (ship.isAlive()) {
              classColor = 'Shot';
            } else {
              classColor = 'Kill';
            }
          }
        }

        items.push(
          <CellComponent
            x={+x}
            y={+y}
            key={cellKey}
            cellClick={this.cellClick}
            classColor={classColor}
          />
        );
      }
    }

    const board = <div className="Board">{items}</div>;

    return (
      <div>
        <div className="App-Grid">{board}</div>
        <button className="Reset" onClick={this.restartClick}>
          Restart
        </button>
      </div>
    );
  }
}
