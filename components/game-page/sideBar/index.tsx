import { SmallButton } from "ui/buttons";
import { Ship1, Ship2, Ship3, Ship4, Ship5 } from "../ship";
import { ButtonsContainer, Root } from "./styled";

interface Props {
  setLength: (props: any) => any;
  setOrientation: (props: any) => any;
  player: "player1" | "player2";
  currentPlayer: "player1" | "player2";
  orientation: string;
  shipsSetted: number[];
}
export function SideBar(props: Props) {
  const { shipsSetted, orientation } = props;
  return (
    <Root>
      <ButtonsContainer>
        <SmallButton
          player={props.player}
          onClick={() => props.setOrientation("horizontal")}
        >
          Horizontal
        </SmallButton>
        <SmallButton
          player={props.player}
          onClick={() => props.setOrientation("vertical")}
        >
          Vertical
        </SmallButton>
        <p style={{ margin: "0" }}>{orientation}</p>
      </ButtonsContainer>
      <div
        style={{
          backgroundColor: `${
            props.player == "player1"
              ? "var(--main-color)"
              : "var(--secondary-color)"
          }`,
          width: "60px",
          minHeight: "370px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {props.currentPlayer == props.player ? (
          <>
            {!shipsSetted.includes(5) ? (
              <Ship1 player={props.player} setLength={props.setLength}></Ship1>
            ) : null}
            {!shipsSetted.includes(4) ? (
              <Ship2 player={props.player} setLength={props.setLength}></Ship2>
            ) : null}
            {!shipsSetted.includes(3) ? (
              <Ship3 player={props.player} setLength={props.setLength}></Ship3>
            ) : null}
            {!shipsSetted.includes(2) ? (
              <Ship4 player={props.player} setLength={props.setLength}></Ship4>
            ) : null}
            {!shipsSetted.includes(1) ? (
              <Ship5 player={props.player} setLength={props.setLength}></Ship5>
            ) : null}
          </>
        ) : null}
      </div>
    </Root>
  );
}
