import styled from "styled-components";

export const Input = styled.input`
  height: 60px;
  width: 100%;
  color: #fff;
  font-family: inherit;
  font-size: 36px;
  background-color: var(--input-bg);
  border: none;
  &:focus {
    outline: solid 1px var(--main-color);
  }
`;
