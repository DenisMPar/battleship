import type { NextPage } from "next";
import { useRecoilState } from "recoil";
import { GamePage } from "../../components/game-page";
import { playersNameState } from "../../hooks/state";
import { GameModel } from "../../lib/models/game";

const Game: NextPage = () => {
  const [playersName, setPlayersName] = useRecoilState(playersNameState);
  const game = new GameModel({
    player1Name: playersName.player1,
    player2Name: playersName.player2,
  });

  return (
    <div>
      <GamePage game={game}></GamePage>
    </div>
  );
};

export default Game;
