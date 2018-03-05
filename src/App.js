import React, { Component } from 'react';
import './App.css';
import './Components/BoardComponent.css';
import BoardComponent from './Components/BoardComponent';
import GridModel from './Models/GridModel';
import ShipModel from './Models/ShipModel';

class App extends Component {
  constructor() {
    super();

    GridModel.setSizeX(10);
    GridModel.setSizeY(10);
    GridModel.gridCreate();

    GridModel.addShip(new ShipModel(4, true));
    GridModel.addShip(new ShipModel(3));
    GridModel.addShip(new ShipModel(1));
    GridModel.addShip(new ShipModel(1));

    GridModel.placeShips();

    this.state = {
      target: 0,
      shoots: 0,
      shipAlive: GridModel.shipCount()
    };
  }

  restartGame = () => {
    GridModel.restart();

    this.setState({
      target: 0,
      shoots: 0,
      shipAlive: GridModel.shipCount()
    });
  };

  cellClick = (isShot, isKill) =>
    this.setState((prevState, props) => ({
      target: isShot ? ++prevState.target : prevState.target,
      shoots: ++prevState.shoots,
      shipAlive: isKill ? --prevState.shipAlive : prevState.shipAlive
    }));

  render() {
    let accuracy = 0;
    if (this.state.shoots && this.state.target)
      accuracy = Math.floor(this.state.target / this.state.shoots * 100);

    const statusMessage = this.state.shipAlive ? 'Playing' : 'Finished';

    return (
      <div className="App">
        <h1>Sea Page</h1>

        <div className="Table">
          <div className="TableItem">
            <BoardComponent
              cellClick={this.cellClick}
              restartGame={this.restartGame}
              shipCount={GridModel.shipCount()}
            />
          </div>
          <div className="TableItem">
            <div className="Stats">
              Stats:
              <div>Shots: {this.state.shoots}</div>
              <div>On target: {this.state.target}</div>
              <div>Accuracy: {accuracy}%</div>
            </div>

            <div>Game Status : {statusMessage}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
