import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  player: "player1" | "player2";
  type: number;
}
export const CaseStyled = styled.div<Props>`
  border: solid 1px;
  border-color: ${(props) =>
    props.player == "player1" ? `var(--main-color)` : `var(--secondary-color)`};
  background-color: ${(props) => {
    const caseTypes: any = {
      1: `var(--bg-dark)`,
      2: `${
        props.player == "player1"
          ? "var(--main-color-dark)"
          : "var(--secondary-color-dark)"
      }`,
      3: `${
        props.player == "player1"
          ? "var(--main-color-dark)"
          : "var(--secondary-color-dark)"
      }`,
      4: `var(--terciary-color)`,
      5: `${
        props.player == "player1"
          ? "var(--main-color-dark-disabled)"
          : "var(--secondary-color-dark-disabled)"
      }`,
    };
    return caseTypes[props.type];
  }};
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  &:hover {
    border: solid 2px;
    border-color: ${(props) =>
      props.player == "player1"
        ? `var(--main-color-hover)`
        : `var(--secondary-color-hover)`};
  }
`;
