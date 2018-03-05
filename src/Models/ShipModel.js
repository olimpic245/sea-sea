/**
 * Ship Model.
 */
class ShipModel {
  /**
   * Ship size.
   *
   * @type {Number}
   */
  Size = 1;

  /**
   * Ship health.
   *
   * @type {Number}
   */
  Health = 1;

  /**
   * Ship direction on board.
   *
   * For ships with size 1-3:
   * 0 - horizontal
   * 1 - vertical
   *
   * @type {Number}
   */
  Direction = 0;

  /**
   * Whether ship is L-shaped.
   *
   * @type {boolean}
   */
  isShape = false;

  /**
   * Initializes ship.
   */
  constructor(Size, isShape = false) {
    if (Size < 1) Size = 1;
    else if (Size > 4) Size = 4;

    if (Size > 2 && isShape) this.isShape = isShape;

    this.Direction = Math.floor(Math.random() * 2);

    this.Size = Size;
    this.Health = Size;
  }

  /**
   * Adds 1 point damage to ship.
   */
  addDamage() {
    if (this.Health) this.Health--;
  }

  /**
   * Checks whether ship is alive.
   *
   * @returns {Boolean} <tt>true</tt> means alive.
   */
  isAlive() {
    return !!this.Health;
  }

  /**
   * Resets ship heals.
   */
  healthReset() {
    this.Health = this.Size;
  }
}

export default ShipModel;
