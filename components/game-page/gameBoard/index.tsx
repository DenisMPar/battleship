import { nanoid } from "nanoid";
import { ReactElement, useEffect, useState } from "react";
import { CheckHoverProps, SetNewShipProps } from "..";
import { Ship1 } from "../ship";
import { useDrop } from "react-dnd";
import style from "./styles.module.css";
import { GameBoardCase } from "./gamboardCase";
import lodash from "lodash";
interface Props {
  grid: any;
  setShip: (props: SetNewShipProps) =>
    | {
        res: boolean;
      }
    | {
        res: "Ships overlapped" | "out of grid";
      };
  player: "player1" | "player2";
  checkHover: (props: CheckHoverProps) => void;
  shipLength: number;
}

export function GameBoardComp(props: Props): ReactElement {
  const [grid, setGrid] = useState<any>([]);
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "vertical"
  );

  useEffect(() => {
    const newGrid = createGrid();
    setGrid(newGrid as any);
  }, [props.grid, orientation]);

  function createGrid() {
    const divs = [];
    const gameGrid = props.grid;

    if (gameGrid) {
      let key = 0;
      for (let y = 1; y <= 10; y++) {
        for (let x = 1; x <= 10; x++) {
          divs.push(
            <GameBoardCase
              orientation={orientation}
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
      <button onClick={() => setOrientation("horizontal")}>Horizontal</button>
      <button onClick={() => setOrientation("vertical")}>Vertical</button>
      <h3>{orientation}</h3>
      <div className={style.root}>{grid}</div>
    </div>
  );
}
