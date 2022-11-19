import { DragEvent, useState } from "react";

import { nanoid } from "nanoid";
import { useRecoilValue } from "recoil";
import { CheckHoverProps, SetNewShipProps } from "../..";
import { shipLengthStatus } from "../../../../hooks/state";
import { CoordsValue } from "../../../../lib/models/gameBoard";

interface Props {
  setShip: (props: SetNewShipProps) =>
    | {
        res: boolean;
      }
    | {
        res: "Ships overlapped" | "out of grid";
      }
    | undefined;
  coords: { x: number; y: number };
  shipLength: number;
  orientation: "horizontal" | "vertical";
  player: "player1" | "player2";
  currentPlayer: "player1" | "player2";
  gameStarted: boolean;
  handleClick: any;
  type: any;
  onHover: (coords: CheckHoverProps) => void;
}

const caseTypes: any = {
  1: "brown",
  2: "blue",
  3: "green",
  4: "red",
  5: "none",
};
export function GameBoardCase(props: Props) {
  const [isShipSetted, setIsShipSetted] = useState(false);
  const shipLength = useRecoilValue(shipLengthStatus);
  function handleDrop(e: DragEvent<HTMLDivElement>) {
    if (props.player == props.currentPlayer) {
      props.setShip({
        coords: props.coords,
        length: shipLength,
        player: props.player,
        orientation: props.orientation,
        nanoId: nanoid,
      });
    }
  }
  function handleDragEnter(e: DragEvent<HTMLDivElement>) {
    if (props.player == props.currentPlayer) {
      setTimeout(() => {
        props.onHover({
          coords: props.coords,
          shipLength: shipLength,
          player: props.player,
          orientation: props.orientation,
        });
      }, 1);
    }
  }

  function handleDragLeave() {
    if (props.player == props.currentPlayer) {
      props.onHover({
        coords: props.coords,
        shipLength: shipLength,
        orientation: props.orientation,
        player: props.player,
        leave: true,
      });
    }
  }
  function handleClick() {
    if (props.player == props.currentPlayer && props.gameStarted) {
      props.handleClick({ coords: props.coords, player: props.player });
    }
  }

  return isShipSetted ? null : (
    <div
      draggable={false}
      onClick={handleClick}
      onDragEnter={(e) => {
        handleDragEnter(e);
      }}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e)}
      style={{
        backgroundColor: caseTypes[props.type],
        border: "solid 1px black",
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    ></div>
  );
}
