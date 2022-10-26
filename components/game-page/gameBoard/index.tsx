import { ReactElement, useEffect, useState } from "react";
import { ShipModel } from "../../../lib/models/ship";
import style from "./styles.module.css";

interface GameBoardProps {
  size: number;
  grid: { x: number; y: number; isHitted: boolean; shipId?: number }[];
  ships: ShipModel[];
  gameOver: boolean;
}

export function GameBoardComp(props: GameBoardProps): ReactElement {
  const [grid, setGrid] = useState([]);
  useEffect(() => {
    if (grid.length === 0) {
      const newGrid = createGrid();
      setGrid(newGrid as any);
    }
  }, [grid.length]);
  function createGrid() {
    const divs = [];
    const grid = props.grid;
    for (let index = 0; index < 100; index++) {
      divs.push(
        <div
          className={grid[index].shipId ? style.ship : style.case}
          key={index}
        ></div>
      );
    }
    return divs;
  }

  return <div className={style.root}>{grid}</div>;
}
