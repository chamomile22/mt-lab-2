export class CellClass {
  constructor(board, x, y, mark) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.mark = mark;
    this.id = Math.random();
  }
}
