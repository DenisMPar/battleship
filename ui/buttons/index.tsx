import styled from "styled-components";
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

export function MainButton(props: {
  children?: string;
  onClick?: (props?: any) => any;
}) {
  return (
    <MainButtonStyled onClick={props.onClick}>
      {props.children}
    </MainButtonStyled>
  );
}
