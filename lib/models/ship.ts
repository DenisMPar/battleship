export interface ShipProps {
  coords: { x: number; y: number }[];
  id: number;
  lenght: number;
  hits: number;
  sunk: boolean;
}
export class ShipModel {
  coords: { x: number; y: number }[];
  id: number;
  lenght: number;
  hits: number;
  sunk: boolean;

  constructor(data: ShipProps) {
    this.coords = data.coords;
    this.id = data.id;
    this.lenght = data.lenght;
    this.hits = data.hits;
    this.sunk = data.sunk;
  }
  hit() {
    this.hits++;
    return this.hits;
  }
  isSunk() {
    if (this.lenght === this.hits) {
      this.sunk = true;
      return true;
    } else {
      return false;
    }
  }
}
