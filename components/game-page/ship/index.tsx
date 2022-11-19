import { useRecoilState } from "recoil";
import { shipLengthStatus } from "../../../hooks/state";

interface Props {
  setLength: (length: number) => void;
}

export function Ship1(props: Props) {
  const [shipLength, setShipLength] = useRecoilState(shipLengthStatus);
  function handleDrag() {
    setShipLength(5);
  }

  return (
    <div
      draggable={true}
      onDragStart={handleDrag}
      style={{ width: "40px", height: "40px", backgroundColor: "red" }}
    >
      ship1
    </div>
  );
}

interface Props {
  setLength: (length: number) => void;
}

export function Ship2(props: Props) {
  const [shipLength, setShipLength] = useRecoilState(shipLengthStatus);
  function handleDrag() {
    setShipLength(4);
  }

  return (
    <div
      draggable={true}
      onDragStart={handleDrag}
      style={{ width: "40px", height: "40px", backgroundColor: "red" }}
    >
      ship2
    </div>
  );
}
export function Ship3(props: Props) {
  const [shipLength, setShipLength] = useRecoilState(shipLengthStatus);
  function handleDrag() {
    setShipLength(3);
  }

  return (
    <div
      draggable={true}
      onDragStart={handleDrag}
      style={{ width: "40px", height: "40px", backgroundColor: "red" }}
    >
      ship3
    </div>
  );
}
export function Ship4(props: Props) {
  const [shipLength, setShipLength] = useRecoilState(shipLengthStatus);
  function handleDrag() {
    setShipLength(2);
  }

  return (
    <div
      draggable={true}
      onDragStart={handleDrag}
      style={{ width: "40px", height: "40px", backgroundColor: "red" }}
    >
      ship4
    </div>
  );
}
export function Ship5(props: Props) {
  const [shipLength, setShipLength] = useRecoilState(shipLengthStatus);
  function handleDrag() {
    setShipLength(1);
  }

  return (
    <div
      draggable={true}
      onDragStart={handleDrag}
      style={{ width: "40px", height: "40px", backgroundColor: "red" }}
    >
      ship5
    </div>
  );
}
