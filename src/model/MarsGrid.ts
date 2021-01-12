class Grid {
  private length: number;
  private height: number;

  forbidden: string[];

  constructor(length: number = 0, height: number = 0) {
    this.length = length;
    this.height = height;
    this.forbidden = [];
  }

  addForbidden(position: string) {
    this.forbidden.push(position);
  }

  hasForbidden(position: string) {
    return this.forbidden.indexOf(position) > -1;
  }
}

export default Grid;
