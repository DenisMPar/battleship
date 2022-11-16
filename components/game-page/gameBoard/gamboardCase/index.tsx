import React, { DragEvent, useEffect, useState } from "react";

import { ItemTypes } from "../../draggableItems";
import { useDrop } from "react-dnd";
import { CheckHoverProps, SetNewShipProps } from "../..";
import { nanoid } from "nanoid";
import { Ship1 } from "../../ship";
import { useRecoilValue } from "recoil";
import { shipLengthStatus } from "../../../../hooks/state";

interface Props {
  setShip: (props: SetNewShipProps) =>
    | {
        res: boolean;
      }
    | {
        res: "Ships overlapped" | "out of grid";
      };
  coords: { x: number; y: number };
  shipLength: number;
  orientation: "horizontal" | "vertical";
  player: "player1" | "player2";
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
    props.setShip({
      coords: props.coords,
      length: shipLength,
      player: props.player,
      orientation: props.orientation,
      nanoId: nanoid,
    });
  }
  function handleDragEnter(e: DragEvent<HTMLDivElement>) {
    setTimeout(() => {
      props.onHover({
        coords: props.coords,
        shipLength: shipLength,
        player: props.player,
        orientation: props.orientation,
      });
    }, 1);
  }

  function handleDragLeave() {
    props.onHover({
      coords: props.coords,
      shipLength: shipLength,
      orientation: props.orientation,
      player: props.player,
      leave: true,
    });
  }

  // const [{ isOver, type }, drop] = useDrop(
  //   () => ({
  //     accept: ItemTypes.SHIP1,
  //     drop: (item: any, monitor) => {
  //       props.setShip({
  //         coords: props.coords,
  //         length: props.shipLength,
  //
  //         player: props.player,
  //         nanoId: nanoid,
  //       });
  //     },
  //     hover: (item, monitor) => {
  //       props.onHover({
  //         coords: props.coords,
  //
  //         shipLength: 5,
  //         player: props.player,
  //       });
  //     },
  //     collect: (monitor) => ({
  //       isOver: !!monitor.isOver({ shallow: true }),
  //       type: monitor.getItemType(),
  //     }),
  //   }),
  //   [props]
  // );

  return isShipSetted ? null : (
    <div
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
