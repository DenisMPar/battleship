import React, { ReactElement } from "react";
import { useRecoilState } from "recoil";
import { playersNameState } from "../../hooks/state";
import { GameModel } from "../../lib/models/game";
import { GameBoardComp } from "./gameBoard";
import styles from "./styles.module.css";

export function GamePage(): ReactElement {
  const [playersName, setPlayersName] = useRecoilState(playersNameState);
  const game = new GameModel({
    player1Name: playersName.player1,
    player2Name: playersName.player2,
  });

  return (
    <div className={styles.root}>
      <div>
        <h2>{playersName.player1}</h2>
        <GameBoardComp {...game.player1.board}></GameBoardComp>
      </div>
      <div>
        <h2>{playersName.player2}</h2>
        <GameBoardComp {...game.player2.board}></GameBoardComp>
      </div>
    </div>
  );
}
