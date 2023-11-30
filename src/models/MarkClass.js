export class MarkClass {
  constructor(cell) {
    this.id = Math.random();
    this.cell = cell;
    this.cell.mark = this;
    this.logo = null;
    this.color = null;
    this.name = '';
  }
}
