class Position {
  x: number;
  y: number;
  orientation: string;
  lost: boolean;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.orientation = "N";
    this.lost = false;
  }

  toString() {
    return `${this.x} ${this.y} ${this.orientation} ${
      this.lost ? " LOST" : ""
    }`;
  }

  isOffTheGrid(grid) {
    if (
      this.x > grid.length ||
      this.y > grid.height ||
      this.y < 0 ||
      this.x < 0
    ) {
      if (this.orientation === "N") this.y = grid.height;
      if (this.orientation === "E") this.x = grid.length;
      if (this.orientation === "S") this.y = 0;
      if (this.orientation === "W") this.x = 0;

      this.lost = true;
      return this.lost;
    }
    return false;
  }
}

export default Position;
