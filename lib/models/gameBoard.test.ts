import { GameBoardModel } from "./gameBoard";
import { gridMock } from "./models-test-mocks";
import { ShipModel } from "./ship";

test("GameBoardModel newBoard", () => {
  const gameBoard = new GameBoardModel();
  expect(gameBoard.grid).toEqual(gridMock);
});

test("GameBoardModel setNewShip", () => {
  const gameBoard = new GameBoardModel();
  const ship = new ShipModel({
    coords: [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
    ],
    id: 1,
    lenght: 3,
    hits: 0,
    sunk: false,
  });
  gameBoard.setNewShip(ship);
  expect(gameBoard.grid).toContainEqual({
    x: 1,
    y: 1,
    shipId: 1,
    isHitted: false,
  });
  expect(gameBoard.grid).toContainEqual({
    x: 2,
    y: 1,
    shipId: 1,
    isHitted: false,
  });
  expect(gameBoard.grid).toContainEqual({
    x: 2,
    y: 1,
    shipId: 1,
    isHitted: false,
  });
  expect(gameBoard.grid.length).toBe(100);
});
test("GameBoardModel receiveAttack", () => {
  const gameBoard = new GameBoardModel();
  gameBoard.setNewShip({
    coords: [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
    ],
    id: 1,
    lenght: 3,
    hits: 0,
    sunk: false,
  });
  gameBoard.receiveAttack({ x: 1, y: 1 });
  expect(gameBoard.grid).toContainEqual({
    x: 1,
    y: 1,
    isHitted: true,
    shipId: 1,
  });
  const shipHitted = gameBoard.ships.find((ship) => ship.id === 1);
  expect(shipHitted?.hits).toBe(1);
  expect(gameBoard.grid.length).toBe(100);
});
test("GameBoardModel receiveAttack", () => {
  const gameBoard = new GameBoardModel();
  gameBoard.setNewShip({
    coords: [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
    ],
    id: 1,
    lenght: 3,
    hits: 3,
    sunk: true,
  });
  gameBoard.setNewShip({
    coords: [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
    ],
    id: 2,
    lenght: 3,
    hits: 3,
    sunk: true,
  });

  expect(gameBoard.checkGameStatus()).toBe(true);
});
