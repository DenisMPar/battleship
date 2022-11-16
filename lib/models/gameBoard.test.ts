import { GameBoardModel } from "./gameBoard";
import { gridMock } from "./models-test-mocks";
import { ShipModel } from "./ship";

test("GameBoardModel newBoard", () => {
  const gameBoard = new GameBoardModel();
  expect(gameBoard.grid).toEqual(gridMock);
});

test("GameBoardModel generate Coords Horizontal", () => {
  const gameBoard = new GameBoardModel();
  expect(
    gameBoard.generateCoords({
      coords: { x: 1, y: 1 },
      length: 3,
      orientation: "horizontal",
      nanoId: () => "123",
    })
  ).toEqual([
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },
  ]);
});
test("GameBoardModel generate Coords Vertical", () => {
  const gameBoard = new GameBoardModel();
  expect(
    gameBoard.generateCoords({
      coords: { x: 1, y: 1 },
      length: 3,
      orientation: "vertical",
      nanoId: () => "123",
    })
  ).toEqual([
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 1, y: 3 },
  ]);
});
test("GameBoardModel setNewShip one ship", () => {
  const gameBoard = new GameBoardModel();

  expect(
    gameBoard.setNewShip({
      coords: { x: 1, y: 1 },
      orientation: "horizontal",
      length: 3,
      nanoId: () => "123",
    })
  ).toBe(true);
  expect(gameBoard.grid).toContainEqual({
    x: 1,
    y: 1,
    shipId: "123",
    isHitted: false,
  });
  expect(gameBoard.grid).toContainEqual({
    x: 2,
    y: 1,
    shipId: "123",
    isHitted: false,
  });
  expect(gameBoard.grid).toContainEqual({
    x: 3,
    y: 1,
    shipId: "123",
    isHitted: false,
  });

  expect(gameBoard.ships).toContainEqual(
    new ShipModel({
      coords: [
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
      ],
      id: "123",
      length: 3,
      hits: 0,
      sunk: false,
    })
  );
  expect(gameBoard.grid.length).toBe(100);
});
test("GameBoardModel setNewShip two ships with overlap", () => {
  const gameBoard = new GameBoardModel();
  gameBoard.setNewShip({
    coords: { x: 1, y: 1 },
    length: 5,
    orientation: "horizontal",
    nanoId: () => "123",
  });
  expect(
    gameBoard.setNewShip({
      coords: { x: 5, y: 1 },
      length: 5,
      orientation: "vertical",
      nanoId: () => "123",
    })
  ).toBe("Ships overlapped");
});
test("GameBoardModel setNewShip two ships without overlap", () => {
  const gameBoard = new GameBoardModel();
  const res = gameBoard.setNewShip({
    coords: { x: 1, y: 1 },
    orientation: "horizontal",
    length: 3,
    nanoId: () => "123",
  });
  expect(gameBoard.grid).toContainEqual({
    x: 1,
    y: 1,
    shipId: "123",
    isHitted: false,
  });
  expect(gameBoard.grid).toContainEqual({
    x: 2,
    y: 1,
    shipId: "123",
    isHitted: false,
  });
  expect(gameBoard.grid).toContainEqual({
    x: 3,
    y: 1,
    shipId: "123",
    isHitted: false,
  });
  expect(res).toBe(true);
});

test("GameBoardModel receiveAttack", () => {
  const gameBoard = new GameBoardModel();
  gameBoard.setNewShip({
    coords: { x: 1, y: 1 },
    orientation: "horizontal",
    length: 3,
    nanoId: () => "123",
  });
  gameBoard.receiveAttack({ x: 1, y: 1 });
  expect(gameBoard.grid).toContainEqual({
    x: 1,
    y: 1,
    isHitted: true,
    shipId: "123",
  });
  const shipHitted = gameBoard.ships.find((ship) => ship.id === "123");
  expect(shipHitted?.hits).toBe(1);
  expect(gameBoard.grid.length).toBe(100);
});
