import { GameBoardModel } from "./gameBoard";

export class PlayerModel {
  name: string;
  board: GameBoardModel;
  constructor(playerName: string) {
    this.name = playerName;
    this.board = new GameBoardModel();
  }
}
