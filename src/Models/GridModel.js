// import ShipModel from './ShipModel.js';

/**
 * Grid model.
 */
class GridModel {
  /**
   * Grid size X.
   *
   * @type {Number}
   */
  sizeX = 1;

  /**
   * Grid size Y.
   *
   * @type {Number}
   */
  sizeY = 1;

  /**
   * List of ship objects.
   *
   * @type {Array}
   */
  ships = [];

  /**
   * Grid.
   *
   * @type {Array}
   */
  Grid = [];

  /**
   * Creates new grid with size X*Y.
   */
  gridCreate() {
    const grid = [];
    for (let x = 0; x < this.sizeX; x++) {
      grid[x] = [];
      for (let y = 0; y < this.sizeY; y++) {
        grid[x][y] = 0;
      }
    }

    this.Grid = grid;
  }

  /**
   * Places all ships from list on grid.
   */
  placeShips() {
    for (const i in this.ships) {
      this.placeShip(this.ships[i]);
      this.ships[i].healthReset();
    }
  }

  /**
   * Places single ship on grid randomly.
   *
   * @param {ShipModel} ship Ship object.
   * @returns {Boolean} Whether ship places.
   */
  placeShip(ship) {
    /**
     * Is can place to grid.
     *
     * @type {Boolean}
     */
    let canPlace = false;

    /**
     * Is can place shape to grid.
     *
     * @type {Boolean}
     */
    let canPlaceShape = true;

    /**
     * Shape position.
     *
     * @type {Number}
     */
    let shapeDirection;

    /**
     * Ship X-position on grid.
     *
     * @type {Number}
     */
    let posX;

    /**
     * Ship shape X-position on grid.
     *
     * @type {Number}
     */
    let posXShape;

    /**
     * Ship Y-position on grid.
     *
     * @type {Number}
     */
    let posY;

    /**
     * Ship shape Y-position on grid.
     *
     * @type {Number}
     */
    let posYShape;

    /**
     * Ship direction.
     *
     * 0 - vertical.
     * 1 - horizontal.
     *
     * @type {Number}
     */
    const direction = ship.Direction;

    /**
     * Ship length
     *
     * @type {Number}
     */
    const shipSize = ship.isShape ? ship.Size - 1 : ship.Size;

    /**
     * Get random direction and positions on grid.
     * Check required grid for the ship with spaces around.
     * If grid not found - repeat loop
     * Else - place ship to this coordinates and exit from loop
     */
    do {
      // Get random direction and positions on grid
      posX = Math.floor(Math.random() * this.sizeX);
      posY = Math.floor(Math.random() * this.sizeY);
      shapeDirection = Math.floor(Math.random() * 2);

      const getPositionStart = pos => Math.max(0, pos - 1);
      const getPositionEnd = (size, pos) => Math.min(size - 1, pos + 1);

      let maxPosX;
      let maxPosY;
      if (direction === 0) {
        maxPosX = posX + shipSize;
        maxPosY = posY;
      } else {
        maxPosX = posX;
        maxPosY = posY + shipSize;
      }

      if (maxPosX <= this.sizeX && maxPosY <= this.sizeY) {
        const position = {};
        const shapePosition = {};

        // Calculate required area for the ship with spaces around.
        position.left = getPositionStart(posX);
        position.up = getPositionStart(posY);
        position.right = getPositionEnd(this.sizeX, maxPosX);
        position.down = getPositionEnd(this.sizeY, maxPosY);

        canPlace = this.canPlace(position);

        canPlaceShape = true;
        if (ship.isShape) {
          if (direction === 0) {
            if (shapeDirection) {
              posXShape = posX;
              posYShape = posY + 1;
            } else {
              posXShape = maxPosX - 1;
              posYShape = posY - 1;
            }
          } else if (shapeDirection) {
            posXShape = posX - 1;
            posYShape = maxPosY - 1;
          } else {
            posXShape = maxPosX + 1;
            posYShape = posY;
          }

          if (this.isPointExist(posXShape, posYShape)) {
            shapePosition.left = getPositionStart(posXShape);
            shapePosition.up = getPositionStart(posYShape);
            shapePosition.right = getPositionEnd(this.sizeX, posXShape);
            shapePosition.down = getPositionEnd(this.sizeY, posYShape);
          } else {
            canPlaceShape = false;
            canPlace = false;
          }

          canPlaceShape = canPlaceShape && this.canPlace(shapePosition);
        }

        if (canPlace && canPlaceShape) {
          if (!direction) {
            for (let i = posX; i < maxPosX; i++) {
              this.Grid[i][posY] = ship;
            }
          } else {
            for (let i = posY; i < maxPosY; i++) {
              this.Grid[posX][i] = ship;
            }
          }

          if (ship.isShape) {
            this.Grid[posXShape][posYShape] = ship;
          }
        }
      }
    } while (!canPlace);
    return canPlace;
  }

  /**
   * Checks that point exists on grid.
   *
   * @param {Number} x Coordinate X.
   * @param {Number} y Coordinate Y.
   * @returns {boolean}
   */
  isPointExist(x, y) {
    return !(x < 0 || x >= this.sizeX || y < 0 || y >= this.sizeY);
  }

  /**
   * Check grids on ship.
   */
  canPlace(position) {
    let canPlace = true;
    for (let curX = position.left; curX <= position.right; curX++) {
      for (let curY = position.up; curY <= position.down; curY++) {
        if (this.Grid[curX][curY]) {
          canPlace = false;
          break;
        }
      }
    }
    return canPlace;
  }

  /**
   * Returns grid.
   *
   * @returns {Array}
   */
  getGrid() {
    return this.Grid;
  }

  /**
   * Returns point value.
   */
  getPoint(x, y) {
    return this.Grid[x][y];
  }

  /**
   * Creates new grid and places ships.
   */
  restart() {
    this.gridCreate();
    this.placeShips();
  }

  /**
   * Sets x size.
   *
   * @param {Number} x
   */
  setSizeX(x) {
    this.sizeX = x;
  }

  /**
   * Sets y size.
   *
   * @param {Number} y
   */
  setSizeY(y) {
    this.sizeY = y;
  }

  /**
   * Adds ship object to ship list.
   *
   * @param {ShipModel} ship
   */
  addShip(ship) {
    this.ships.push(ship);
  }

  /**
   * Removes all ships from ship list.
   */
  clearShips() {
    this.ships = [];
  }

  /**
   * Count of ships in list.
   *
   * @returns {Number}
   */
  shipCount() {
    return this.ships.length;
  }
}

export default new GridModel();
