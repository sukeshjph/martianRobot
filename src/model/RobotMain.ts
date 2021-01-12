import Position from "./PositionMain";
import Grid from "./MarsGrid";

class Robot {
  private position: Position;
  right = { N: "E", E: "S", S: "W", W: "N" };
  left = { N: "W", W: "S", S: "E", E: "N" };
  private grid: Grid;
  private instructions: string;

  constructor(grid) {
    this.grid = grid;
    this.position = new Position();
    this.instructions = "";
  }

  isLeftTurn(instruction: string) {
    return instruction === "L";
  }

  isRightTurn(instruction: string) {
    return instruction === "R";
  }

  isForwardMovement(instruction: string) {
    return instruction === "F";
  }

  setPosition(startPosition: string) {
    const splitStartPosition = startPosition.split(" ");
    this.position.x = parseInt(splitStartPosition[0], 10);
    this.position.y = parseInt(splitStartPosition[1], 10);
    this.position.orientation = splitStartPosition[2];
  }

  getPosition() {
    return this.position;
  }

  getInstructions() {
    return this.instructions;
  }

  setInstructions(instructions: string) {
    this.instructions = instructions;
  }

  move() {
    for (let instruction of this.instructions) {
      if (this.isLost()) break;

      if (this.isLeftTurn(instruction)) this.turnLeft();
      if (this.isRightTurn(instruction)) this.turnRight();
      if (this.isForwardMovement(instruction)) this.moveForwards();
    }
    return this.position.toString();
  }

  moveForwards() {
    var startingPosition = this.position.toString();

    if (this.isLost() || this.grid.hasForbidden(startingPosition)) return;

    const { orientation } = this.position;

    if (orientation === "N") this.position.y++;
    if (orientation === "E") this.position.x++;
    if (orientation === "S") this.position.y--;
    if (orientation === "W") this.position.x--;

    if (this.position.isOffTheGrid(this.grid))
      this.grid.addForbidden(startingPosition);
  }

  turnLeft() {
    this.position.orientation = this.left[this.position.orientation];
  }

  turnRight() {
    this.position.orientation = this.right[this.position.orientation];
  }

  isLost() {
    return this.position.lost;
  }
}

export default Robot;
