import { MarkClass } from "./MarkClass";

export class MissClass extends MarkClass{
  constructor(cell) {
    super(cell);
    this.logo = null;
    this.name = 'miss';
    this.color = '#49668b';
  }
}
