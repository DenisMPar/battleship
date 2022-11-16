import { ShipModel, ShipProps } from "./ship";

import * as lodash from "lodash";
import { isString } from "lodash";

export interface setShipProps {
  coords: { x: number; y: number };
  orientation: "horizontal" | "vertical";
  length: number;
  nanoId: () => string;
}
export type CoordsValue = {
  x: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  y: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
};
export class GameBoardModel {
  size: number = 10;
  grid: {
    x: number;
    y: number;
    isHitted: boolean;
    shipId: string;
    type?: number;
  }[];
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
          gridFile.push({ x: j, y: currentFile, isHitted: false, shipId: "" });
        }
        currentFile++;
        result = result.concat(gridFile);
      }
      return result;
    })();
  }

  setNewGrid(grid: any) {
    this.grid = grid;
  }
  generateCoords(
    props: setShipProps
  ): { x: number; y: number }[] | "Ships overlapped" | "out of grid" {
    const { coords } = props;

    const newCoords = [coords];
    if (props.orientation === "horizontal") {
      if (coords.x + (props.length - 1) > 10) {
        return "out of grid";
      }
      for (let index = 1; index < props.length; index++) {
        newCoords.push({ x: coords.x + index, y: coords.y });
      }
    }
    if (props.orientation === "vertical") {
      if (coords.y + (props.length - 1) > 10) {
        return "out of grid";
      }
      for (let index = 1; index < props.length; index++) {
        newCoords.push({ x: coords.x, y: coords.y + index });
      }
    }
    let overlap = false;
    newCoords.forEach((element) => {
      lodash.find(this.grid, (el) => {
        if (el.x === element.x && el.y === element.y && el.shipId !== "") {
          overlap = true;
        }
      });
    });

    return overlap ? "Ships overlapped" : newCoords;
  }

  checkPosition(props: setShipProps) {
    const newCoords = this.generateCoords(props);
    return newCoords;
  }

  setNewShip(props: setShipProps) {
    const newCoords = this.generateCoords(props);

    if (isString(newCoords)) {
      return newCoords;
    }

    const newShip = new ShipModel({
      coords: newCoords,
      id: props.nanoId(),
      length: props.length,
      hits: 0,
      sunk: false,
    });

    newShip.coords.forEach((shipCoord) => {
      const indexOfCoords = this.grid.findIndex(
        (gridCoord) =>
          gridCoord.x === shipCoord.x && gridCoord.y === shipCoord.y
      );

      this.grid[indexOfCoords] = {
        ...shipCoord,
        isHitted: false,
        shipId: newShip.id,
        type: 2,
      };
    });
    this.ships.push(newShip);

    return true;
  }

  receiveAttack(coords: CoordsValue) {
    const indexOfCoord = this.grid.findIndex(
      (gridCoord) => gridCoord.x === coords.x && gridCoord.y === coords.y
    );
    this.grid[indexOfCoord].isHitted = true;
    //if the coords belongs to a ship must add a hit
    if (this.grid[indexOfCoord].shipId) {
      const shipId = this.grid[indexOfCoord].shipId;
      const shipHitted = this.ships.find((ship) => ship.id == shipId);

      shipHitted?.hit();
    }
    this.checkGameStatus();
  }
  checkGameStatus() {
    if (this.ships.every((ship) => ship.sunk === true)) this.gameOver = true;
  }
  getGameStatus() {
    return this.gameOver;
  }
}
