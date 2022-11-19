import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  width: 80%;
  height: 80%;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 18px;
  text-align: center;
`;
export const ButtonContainer = styled.div`
  width: 100%;
  max-width: 225px;
`;
