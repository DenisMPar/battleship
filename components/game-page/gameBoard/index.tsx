import { nanoid } from "nanoid";
import { ReactElement, useEffect, useState } from "react";
import { CheckHoverProps, SetNewShipProps } from "..";
import { Ship1 } from "../ship";
import { useDrop } from "react-dnd";
import style from "./styles.module.css";
import { GameBoardCase } from "./gamboardCase";
import lodash from "lodash";
import { CoordsValue } from "../../../lib/models/gameBoard";
interface Props {
  grid: any;
  setShip: (props: SetNewShipProps) =>
    | {
        res: boolean;
      }
    | {
        res: "Ships overlapped" | "out of grid";
      }
    | undefined;
  player: "player1" | "player2";
  currentPlayer: "player1" | "player2";
  handleClick: any;
  gameStarted: boolean;
  orientation: "vertical" | "horizontal";
  checkHover: (props: CheckHoverProps) => void;
  shipLength: number;
}

export function GameBoardComp(props: Props): ReactElement {
  const [grid, setGrid] = useState<any>([]);

  useEffect(() => {
    const newGrid = createGrid();
    setGrid(newGrid as any);
  }, [
    props.grid,
    props.orientation,
    props.currentPlayer,
    props.gameStarted,
    props.handleClick,
  ]);

  function createGrid() {
    const divs = [];
    const gameGrid = props.grid;

    if (gameGrid) {
      let key = 0;
      for (let y = 1; y <= 10; y++) {
        for (let x = 1; x <= 10; x++) {
          divs.push(
            <GameBoardCase
              handleClick={props.handleClick}
              gameStarted={props.gameStarted}
              currentPlayer={props.currentPlayer}
              orientation={props.orientation}
              shipLength={props.shipLength}
              onHover={props.checkHover}
              setShip={props.setShip}
              coords={{ x, y }}
              player={props.player}
              type={gameGrid[key].type ? gameGrid[key].type : 1}
              key={key}
            ></GameBoardCase>
          );
          key++;
        }
      }
    }
    return divs;
  }

  return (
    <div>
      <div className={style.root}>{grid}</div>
    </div>
  );
}
