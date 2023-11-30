import { CellClass } from "./CellClass";
import { ShipClass } from "./ShipClass";
import { MissClass } from "./MissClass";
import { DamageClass } from "./DamageClass";

export class BoardClass {
  cells = [];

  initCells() {
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(new CellClass(this, j, i, null))
      }
      this.cells.push(row);
    }
  }

  getCopyBoard() {
    const newBoard = new BoardClass();
    newBoard.cells = this.cells;
    return newBoard;
  }

  getCells(x, y){
    return this.cells[y][x];
  }

  addShip(x, y){
    new ShipClass(this.getCells(x, y));
  }

  addMiss(x, y){
    new MissClass(this.getCells(x, y));
  }

  addDamage(x, y){
    new DamageClass(this.getCells(x, y));
  }
}
