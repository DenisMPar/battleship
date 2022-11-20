export interface ShipProps {
  coords: { x: number; y: number }[];
  id: string;
  length: number;
  hits: number;
  sunk: boolean;
}
export class ShipModel {
  coords: { x: number; y: number }[];
  id: string;
  length: number;
  hits: number;
  sunk: boolean;

  constructor(data: ShipProps) {
    this.coords = data.coords;
    this.id = data.id;
    this.length = data.length;
    this.hits = data.hits;
    this.sunk = data.sunk;
  }
  hit() {
    this.hits++;
    if (this.length === this.hits) {
      this.sunk = true;
      return true;
    }
  }
}
