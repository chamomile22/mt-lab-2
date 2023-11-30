import { MarkClass } from "./MarkClass";

export class DamageClass extends MarkClass{
  constructor(cell) {
    super(cell);
    this.logo = '❌';
    this.name = 'damage';
    this.color = '#df4343';
  }
}
