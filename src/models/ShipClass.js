import { MarkClass } from "./MarkClass";

export class ShipClass extends MarkClass{
  constructor(cell) {
    super(cell);
    this.logo = null;
    this.name = 'ship';
    this.color = '#8fbcba';
  }
}
