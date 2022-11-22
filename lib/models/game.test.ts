import { GameModel } from "./game";
import { PlayerModel } from "./player";

test("GameModel get player1", () => {
  const game = new GameModel({
    player1Name: "userName1",
    player2Name: "userName2",
  });
  const player = game.getPlayer1();
  expect(player).toBeInstanceOf(PlayerModel);
  expect(player.name).toBe("userName1");
});
test("GameModel get player2", () => {
  const game = new GameModel({
    player1Name: "userName1",
    player2Name: "userName2",
  });
  const player = game.getPlayer2();
  expect(player).toBeInstanceOf(PlayerModel);
  expect(player.name).toBe("userName2");
});
test("GameModel Player1 shipsSetted", () => {
  const game = new GameModel({
    player1Name: "userName1",
    player2Name: "userName2",
  });
  game.player1.board.setNewShip({
    coords: { x: 1, y: 1 },
    orientation: "horizontal",
    length: 5,
    nanoId: () => "123",
  });
  game.player1.board.setNewShip({
    coords: { x: 4, y: 2 },
    orientation: "horizontal",
    length: 3,
    nanoId: () => "123",
  });
  game.player1.board.setNewShip({
    coords: { x: 5, y: 1 },
    orientation: "vertical",
    length: 2,
    nanoId: () => "123",
  });
  game.player1.board.setNewShip({
    coords: { x: 1, y: 8 },
    orientation: "horizontal",
    length: 3,
    nanoId: () => "123",
  });
  expect(game.player1.board.grid).toContainEqual({
    x: 4,
    y: 2,
    shipId: "123",
    isHitted: false,
    type: 2,
  });
  expect(game.player1.board.grid).toContainEqual({
    x: 1,
    y: 1,
    shipId: "123",
    isHitted: false,
    type: 2,
  });
  expect(game.player1.board.grid).toContainEqual({
    x: 5,
    y: 1,
    shipId: "123",
    isHitted: false,
    type: 2,
  });
  expect(game.player1.board.grid).toContainEqual({
    x: 1,
    y: 8,
    shipId: "123",
    isHitted: false,
    type: 2,
  });
});
test("GameModel Player2 shipsSetted", () => {
  const game = new GameModel({
    player1Name: "userName1",
    player2Name: "userName2",
  });
  game.player2.board.setNewShip({
    coords: { x: 1, y: 1 },
    orientation: "horizontal",
    length: 5,
    nanoId: () => "123",
  });
  game.player2.board.setNewShip({
    coords: { x: 4, y: 2 },
    orientation: "horizontal",
    length: 3,
    nanoId: () => "123",
  });
  game.player2.board.setNewShip({
    coords: { x: 5, y: 1 },
    orientation: "vertical",
    length: 2,
    nanoId: () => "123",
  });
  game.player2.board.setNewShip({
    coords: { x: 1, y: 8 },
    orientation: "horizontal",
    length: 3,
    nanoId: () => "123",
  });
  expect(game.player2.board.grid).toContainEqual({
    x: 4,
    y: 2,
    shipId: "123",
    isHitted: false,
    type: 2,
  });
  expect(game.player2.board.grid).toContainEqual({
    x: 1,
    y: 1,
    shipId: "123",
    isHitted: false,
    type: 2,
  });
  expect(game.player2.board.grid).toContainEqual({
    x: 5,
    y: 1,
    shipId: "123",
    isHitted: false,
    type: 2,
  });
  expect(game.player2.board.grid).toContainEqual({
    x: 1,
    y: 8,
    shipId: "123",
    isHitted: false,
    type: 2,
  });
});
test("GameModel nextPlayer", () => {
  const game = new GameModel({
    player1Name: "userName1",
    player2Name: "userName2",
  });
  expect(game.currentPlayer).toBe("player1");
  game.nextPlayer();
  expect(game.currentPlayer).toBe("player2");
});
test("GameModel newMove Player1", () => {
  const game = new GameModel({
    player1Name: "userName1",
    player2Name: "userName2",
  });
  game.newMove({ x: 1, y: 1 });
  expect(game.player2.board.grid[0]).toHaveProperty("isHitted", true);
  expect(game.currentPlayer).toBe("player2");
});
test("GameModel newMove Player2", () => {
  const game = new GameModel({
    player1Name: "userName1",
    player2Name: "userName2",
  });
  game.newMove({ x: 1, y: 1 });
  game.newMove({ x: 1, y: 1 });
  expect(game.player1.board.grid[0]).toHaveProperty("isHitted", true);
  expect(game.currentPlayer).toBe("player1");
});
