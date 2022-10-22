import { ShipModel, ShipProps } from "./ship";

// interface GameBoardProps {
//   size: number;
//   shipsLocations: { x: number; y: number; shipId: number; isHitted: boolean }[];
//   boats: ShipProps[];
// }
type CoordsValue = {
  x: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  y: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
};
export class GameBoardModel {
  size: number = 10;
  grid: { x: number; y: number; isHitted: boolean; shipId?: number }[];
  ships: ShipModel[] = [];
  gameOver: boolean = false;
  constructor() {
    //the constructor builds a new grid of 10x10
    this.grid = (() => {
      let currentFile = 1;
      let result: any = [];
      for (let i = 0; i < 10; i++) {
        const gridFile = [];
        for (let j = 1; j <= 10; j++) {
          gridFile.push({ x: j, y: currentFile, isHitted: false });
        }
        currentFile++;
        result = result.concat(gridFile);
      }
      return result;
    })();
  }

  setNewShip(shipData: ShipProps) {
    const newShip = new ShipModel({
      coords: shipData.coords,
      id: shipData.id,
      lenght: shipData.lenght,
      hits: 0,
      sunk: false,
    });
    this.ships.push(newShip);
    //for each coords of the ship must find the coord en the grid and add the newShipId
    newShip.coords.forEach((shipCoord) => {
      const indexOfCoords = this.grid.findIndex(
        (gridCoord) =>
          gridCoord.x === shipCoord.x && gridCoord.y === shipCoord.y
      );
      this.grid[indexOfCoords].shipId = newShip.id;
    });
  }

  receiveAttack(coords: CoordsValue) {
    const indexOfCoord = this.grid.findIndex(
      (gridCoord) => gridCoord.x === coords.x && gridCoord.y === coords.y
    );
    this.grid[indexOfCoord].isHitted = true;
    //if the coords belongs to a ship must add a hit
    if (this.grid[indexOfCoord].shipId) {
      const shipId = this.grid[indexOfCoord].shipId;
      const shipHitted = this.ships.find((ship) => ship.id === shipId);
      shipHitted?.hit();
    }
    this.checkGameStatus();
  }
  checkGameStatus() {
    if (this.ships.every((ship) => ship.sunk === true)) this.gameOver = true;
  }
}
