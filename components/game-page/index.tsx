import lodash from "lodash";
import { ReactElement, useEffect, useState } from "react";
import { GameModel } from "../../lib/models/game";
import { GameBoardComp } from "./gameBoard";
import { Ship1, Ship2, Ship3, Ship4, Ship5 } from "./ship";
import styles from "./styles.module.css";
interface Props {
  game: GameModel;
}
export interface CheckHoverProps {
  coords: { x: number; y: number };
  shipLength: number;
  player: "player1" | "player2";
  leave?: boolean;
  orientation: "horizontal" | "vertical";
}
export interface SetNewShipProps {
  coords: { x: number; y: number };
  length: number;
  nanoId: () => string;
  player: "player1" | "player2";
  orientation: "horizontal" | "vertical";
}

export function GamePage({ game }: Props): ReactElement {
  const [player1Grid, setPlayer1Grid] = useState<any>();
  const [player2Grid, setPlayer2Grid] = useState<any>();
  const [selectedShipLength, setSelectedShipLength] = useState<number>(0);

  useEffect(() => {
    setPlayer1Grid(game.player1.board.grid as any);
    setPlayer2Grid(game.player2.board.grid as any);
  }, []);

  function checkHover(props: CheckHoverProps) {
    const grid = props.player === "player1" ? player1Grid : player2Grid;
    const board =
      props.player === "player1" ? game.player1.board : game.player2.board;
    const res = lodash.find(grid, (el: any) => {
      return el.x == props.coords.x && el.y == props.coords.y;
    });

    const validPosition = board.checkPosition({
      coords: props.coords,
      orientation: props.orientation,
      length: props.shipLength,
      nanoId: () => "test",
    });
    if (validPosition != "Ships overlapped" && validPosition != "out of grid") {
      if (props.orientation == "horizontal") {
        for (let i = 0; i < props.shipLength; i++) {
          const index = grid?.indexOf(res);
          if (grid[index + i] && !grid[index + i].shipId) {
            if (!props.leave) {
              grid[index + i].type = 2;
              const newGrid = structuredClone(grid);
              setPlayer1Grid(newGrid);
            } else {
              grid[index + i].type = 1;
              const newGrid = structuredClone(grid);
              setPlayer1Grid(newGrid);
            }
          }
        }
      }
      if (props.orientation == "vertical") {
        for (let i = 0; i < props.shipLength; i++) {
          const index = grid?.indexOf(res);
          if (grid[index + i * 10]) {
            if (props.leave) {
              grid[index + i * 10].type = 1;
              const newGrid = structuredClone(grid);
              setPlayer1Grid(newGrid);
            } else {
              grid[index + i * 10].type = 2;
              const newGrid = structuredClone(grid);
              setPlayer1Grid(newGrid);
            }
          }
        }
      }
    }
  }

  function setShip(props: SetNewShipProps) {
    const grid = props.player === "player1" ? player1Grid : player2Grid;
    const board =
      props.player === "player1" ? game.player1.board : game.player2.board;

    const res = board.setNewShip(props);
    if (res === true) {
      const newGrid = structuredClone(grid);
      if (props.player === "player1") {
        setPlayer1Grid(newGrid as any);
      } else {
        setPlayer2Grid(newGrid as any);
      }
      return { res };
    } else {
      alert(res);
      return { res };
    }
  }

  return (
    <div className={styles.root}>
      <Ship1 setLength={setSelectedShipLength}></Ship1>
      <Ship2 setLength={setSelectedShipLength}></Ship2>
      <Ship3 setLength={setSelectedShipLength}></Ship3>
      <Ship4 setLength={setSelectedShipLength}></Ship4>
      <Ship5 setLength={setSelectedShipLength}></Ship5>
      <div>
        <h2>{game.player1.name}</h2>
        <GameBoardComp
          shipLength={selectedShipLength}
          checkHover={checkHover}
          player="player1"
          grid={player1Grid}
          setShip={setShip}
        ></GameBoardComp>
      </div>
      {/* <div>
        <h2>{game.player2.name}</h2>
        <GameBoardComp
          checkHover={checkHover}
          player="player2"
          grid={player2Grid}
          setShip={setShip}
        ></GameBoardComp>
      </div> */}
    </div>
  );
}
