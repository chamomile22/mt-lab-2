import { MarkClass } from "./MarkClass";

export class DamageClass extends MarkClass{
  constructor(cell) {
    super(cell);
    this.logo = '&#10060;';
    this.name = 'damage';
    this.color = '#df4343';
  }
}
