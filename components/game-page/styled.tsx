import styled from "styled-components";

export const Root = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  color: #fff;
  width: 100%;
  max-width: 1366px;
  margin: 0 auto;
  height: 100%;

  padding: 20px;
`;
export const BoardsAndSideBarContainerPlayer1 = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  justify-items: center;
`;
export const BoardsAndSideBarContainerPlayer2 = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  justify-items: center;
`;
export const SideBarContainer = styled.div``;
export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 29px;
`;
export const ButtonContainer = styled.div`
  width: 100%;
  max-width: 115px;
  margin: 0 auto;
`;
export const CurrentPlayerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column-start: 1;
  grid-column-end: 3;
`;
export const FinishedGameContainer = styled.div`
  color: #fff;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: var(--bg);
`;
