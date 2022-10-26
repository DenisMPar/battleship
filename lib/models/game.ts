import { CoordsValue } from "./gameBoard";
import {
  shipMock1,
  shipMock2,
  shipMock3,
  shipMock4,
  shipMock5,
  shipMock6,
  shipMock7,
  shipMock8,
} from "./models-test-mocks";
import { PlayerModel } from "./player";
interface GameModelProps {
  player1Name: string;
  player2Name: string;
}
export class GameModel {
  player1: PlayerModel;
  player2: PlayerModel;
  currentPlayer: "player1" | "player2";
  defender: "player1" | "player2";
  winner: string = "";

  constructor(gameData: GameModelProps) {
    this.player1 = new PlayerModel(gameData.player1Name);
    this.player2 = new PlayerModel(gameData.player2Name);
    this.currentPlayer = "player1";
    this.defender = "player2";

    this.player1.board.setNewShip(shipMock1);
    this.player1.board.setNewShip(shipMock2);
    this.player1.board.setNewShip(shipMock3);
    this.player1.board.setNewShip(shipMock4);

    this.player2.board.setNewShip(shipMock5);
    this.player2.board.setNewShip(shipMock6);
    this.player2.board.setNewShip(shipMock7);
    this.player2.board.setNewShip(shipMock8);
  }
  getPlayer1() {
    return this.player1;
  }
  getPlayer2() {
    return this.player2;
  }
  getCurrentPlayer() {
    return this.currentPlayer;
  }
  getPlayer1Name() {
    return this.player1.name;
  }
  getPlayer2Name() {
    return this.player2.name;
  }
  getWinner() {
    return this.winner;
  }

  nextPlayer() {
    if (this.currentPlayer === "player1") {
      this.currentPlayer = "player2";
    } else {
      this.currentPlayer = "player1";
    }
  }
  newMove(coords: CoordsValue) {
    if (this.defender === "player1") {
      this.player1.board.receiveAttack(coords);
      this.currentPlayer = "player1";
      this.defender = "player2";
    } else {
      this.player2.board.receiveAttack(coords);
      this.currentPlayer = "player2";
      this.defender = "player1";
    }
  }
}
