import styled from "styled-components";
interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  player: "player1" | "player2";
}
const MainButtonStyled = styled.button`
  font-family: inherit;
  font-size: 40px;
  height: 80px;
  width: 100%;
  background-color: var(--main-color);
  color: black;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: var(--main-color-hover);
  }
`;
const SecondaryButtonStyled = styled.button<Props>`
  font-family: inherit;
  font-size: 20px;
  height: 40px;
  width: 100%;
  background-color: ${(props) =>
    props.player == "player1" ? "var(--main-color)" : "var(--secondary-color)"};
  color: black;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.player == "player1"
        ? "var(--main-color-hover)"
        : "var(--secondary-color-hover)"};
  }
  &:disabled {
    background-color: ${(props) =>
      props.player == "player1"
        ? "var(--main-color-disabled)"
        : "var(--secondary-color-disabled)"};
  }
`;
const SmallButtonStyled = styled.button<Props>`
  font-family: inherit;
  font-size: 14px;
  height: 28px;
  width: 100%;
  background-color: ${(props) =>
    props.player == "player1" ? "var(--main-color)" : "var(--secondary-color)"};
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.player == "player1"
        ? "var(--main-color-hover)"
        : "var(--secondary-color-hover)"};
  }
`;

export function MainButton(props: {
  children?: string;
  disabled?: boolean;
  onClick?: (props?: any) => any;
}) {
  return (
    <MainButtonStyled disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </MainButtonStyled>
  );
}
export function SecondaryButton(props: {
  player: "player1" | "player2";
  children?: string;
  disabled?: boolean;
  onClick?: (props?: any) => any;
}) {
  return (
    <SecondaryButtonStyled
      player={props.player}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </SecondaryButtonStyled>
  );
}
export function SmallButton(props: {
  player: "player1" | "player2";
  children?: string;
  onClick?: (props?: any) => any;
}) {
  return (
    <SmallButtonStyled player={props.player} onClick={props.onClick}>
      {props.children}
    </SmallButtonStyled>
  );
}
