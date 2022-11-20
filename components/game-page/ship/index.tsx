import { useRecoilState } from "recoil";
import { Ship1Icon } from "ui/icons";
import { shipLengthStatus } from "../../../hooks/state";
import { ShipContainer } from "./styled";

interface Props {
  setLength: (length: number) => void;
  player: "player1" | "player2";
}

export function Ship1(props: Props) {
  const [shipLength, setShipLength] = useRecoilState(shipLengthStatus);
  function handleDrag() {
    setShipLength(5);
  }

  return (
    <ShipContainer
      player={props.player}
      draggable={true}
      onDragStart={handleDrag}
    >
      <Ship1Icon />
    </ShipContainer>
  );
}

export function Ship2(props: Props) {
  const [shipLength, setShipLength] = useRecoilState(shipLengthStatus);
  function handleDrag() {
    setShipLength(4);
  }

  return (
    <ShipContainer
      player={props.player}
      draggable={true}
      onDragStart={handleDrag}
    >
      <Ship1Icon />
    </ShipContainer>
  );
}
export function Ship3(props: Props) {
  const [shipLength, setShipLength] = useRecoilState(shipLengthStatus);
  function handleDrag() {
    setShipLength(3);
  }

  return (
    <ShipContainer
      player={props.player}
      draggable={true}
      onDragStart={handleDrag}
    >
      <Ship1Icon />
    </ShipContainer>
  );
}
export function Ship4(props: Props) {
  const [shipLength, setShipLength] = useRecoilState(shipLengthStatus);
  function handleDrag() {
    setShipLength(2);
  }

  return (
    <ShipContainer
      player={props.player}
      draggable={true}
      onDragStart={handleDrag}
    >
      <Ship1Icon />
    </ShipContainer>
  );
}
export function Ship5(props: Props) {
  const [shipLength, setShipLength] = useRecoilState(shipLengthStatus);
  function handleDrag() {
    setShipLength(1);
  }

  return (
    <ShipContainer
      player={props.player}
      draggable={true}
      onDragStart={handleDrag}
    >
      <Ship1Icon />
    </ShipContainer>
  );
}
