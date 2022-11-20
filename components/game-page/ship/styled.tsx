import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  player: "player1" | "player2";
}
export const ShipContainer = styled.div<Props>`
  background-color: ${(props) =>
    props.player == "player1"
      ? "var(--main-color-dark)"
      : "var(--secondary-color-dark);"};
  width: 60px;
  height: 60px;
  &:hover {
    border: solid 1px black;
  }
`;
