import styled from "styled-components";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  player: "player1" | "player2";
}
export const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

export const ShipsContainer = styled.div<Props>`
  background-color: ${(props) =>
    props.player == "player1" ? "var(--main-color)" : "var(--secondary-color)"};
  width: 60px;
  min-height: 370px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;
export const ButtonsContainer = styled.div`
  color: #fff;
  width: 100%;
  max-height: 120px;
  max-width: 98px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;
