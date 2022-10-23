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
  expect(game.player1.board.grid).toContainEqual({
    x: 1,
    y: 5,
    isHitted: false,
    shipId: 1,
  });
  expect(game.player1.board.grid).toContainEqual({
    x: 1,
    y: 1,
    isHitted: false,
    shipId: 2,
  });
  expect(game.player1.board.grid).toContainEqual({
    x: 3,
    y: 2,
    isHitted: false,
    shipId: 3,
  });
  expect(game.player1.board.grid).toContainEqual({
    x: 7,
    y: 3,
    isHitted: false,
    shipId: 4,
  });
});
test("GameModel Player2 shipsSetted", () => {
  const game = new GameModel({
    player1Name: "userName1",
    player2Name: "userName2",
  });
  expect(game.player2.board.grid).toContainEqual({
    x: 1,
    y: 5,
    isHitted: false,
    shipId: 1,
  });
  expect(game.player2.board.grid).toContainEqual({
    x: 1,
    y: 1,
    isHitted: false,
    shipId: 2,
  });
  expect(game.player2.board.grid).toContainEqual({
    x: 3,
    y: 2,
    isHitted: false,
    shipId: 3,
  });
  expect(game.player2.board.grid).toContainEqual({
    x: 7,
    y: 3,
    isHitted: false,
    shipId: 4,
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
