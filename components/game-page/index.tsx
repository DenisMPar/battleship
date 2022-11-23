import lodash from "lodash";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { MainButton, SecondaryButton } from "ui/buttons";
import { SubTitle, Title } from "ui/text";
import { GameModel } from "../../lib/models/game";
import { GameBoardComp } from "./gameBoard";
import { SideBar } from "./sideBar";
import {
  BoardContainer,
  BoardsAndSideBarContainerPlayer1,
  BoardsAndSideBarContainerPlayer2,
  ButtonContainer,
  CurrentPlayerContainer,
  FinishedGameContainer,
  Root,
  SideBarContainer,
  WinnerButtonContainer,
} from "./styled";
interface Props {
  game: GameModel;
}
export interface CheckHoverProps {
  coords: { x: number; y: number };
  shipLength: number;
  player: "player1" | "player2";
  leave?: boolean;
  orientation: "horizontal" | "vertical";
}
export interface SetNewShipProps {
  coords: { x: number; y: number };
  length: number;
  nanoId: () => string;
  player: "player1" | "player2";
  orientation: "horizontal" | "vertical";
}

export function GamePage({ game }: Props): ReactElement {
  const [player1Grid, setPlayer1Grid] = useState<any>();
  const [player2Grid, setPlayer2Grid] = useState<any>();
  const [selectedShipLength, setSelectedShipLength] = useState<number>(0);
  const [shipsSettedPlayer1, setShipsSettedPlayer1] = useState<number[]>([]);
  const [shipsSettedPlayer2, setShipsSettedPlayer2] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<"player2" | "player1">(
    "player1"
  );
  const [orientationPlayer1, setOrientationPlayer1] = useState<
    "horizontal" | "vertical"
  >("vertical");
  const [orientationPlayer2, setOrientationPlayer2] = useState<
    "horizontal" | "vertical"
  >("vertical");

  useEffect(() => {
    setPlayer1Grid(game.player1.board.grid as any);
    setPlayer2Grid(game.player2.board.grid as any);
  }, []);

  function checkHover(props: CheckHoverProps) {
    const grid = props.player === "player1" ? player1Grid : player2Grid;
    const board =
      props.player === "player1" ? game.player1.board : game.player2.board;
    const setGrid =
      props.player === "player1" ? setPlayer1Grid : setPlayer2Grid;
    const res = lodash.find(grid, (el: any) => {
      return el.x == props.coords.x && el.y == props.coords.y;
    });

    const validPosition = board.checkPosition({
      coords: props.coords,
      orientation: props.orientation,
      length: props.shipLength,
      nanoId: () => "test",
    });
    if (validPosition != "Ships overlapped" && validPosition != "out of grid") {
      if (props.orientation == "horizontal") {
        for (let i = 0; i < props.shipLength; i++) {
          const index = grid?.indexOf(res);
          if (grid[index + i] && !grid[index + i].shipId) {
            if (!props.leave) {
              grid[index + i].type = 2;
              const newGrid = structuredClone(grid);
              setGrid(newGrid);
            } else {
              grid[index + i].type = 1;
              const newGrid = structuredClone(grid);
              setGrid(newGrid);
            }
          }
        }
      }
      if (props.orientation == "vertical") {
        for (let i = 0; i < props.shipLength; i++) {
          const index = grid?.indexOf(res);
          if (grid[index + i * 10]) {
            if (props.leave) {
              grid[index + i * 10].type = 1;
              const newGrid = structuredClone(grid);
              setGrid(newGrid);
            } else {
              grid[index + i * 10].type = 2;
              const newGrid = structuredClone(grid);
              setGrid(newGrid);
            }
          }
        }
      }
    }
  }

  function setShip(props: SetNewShipProps) {
    const grid = props.player === "player1" ? player1Grid : player2Grid;
    const board =
      props.player === "player1" ? game.player1.board : game.player2.board;

    const res = board.setNewShip(props);
    if (res === true) {
      const newGrid = structuredClone(grid);
      if (props.player === "player1") {
        setShipsSettedPlayer1([...shipsSettedPlayer1, props.length]);
        setPlayer1Grid(newGrid as any);
      } else {
        setShipsSettedPlayer2([...shipsSettedPlayer2, props.length]);
      }
      return { res };
    } else {
      alert(res);
      return { res };
    }
  }
  function handleNext(player: "player1" | "player2") {
    const board =
      player === "player1" ? game.player1.board : game.player2.board;
    if (player == "player1") {
      game.player1.board.hideShips();
      const newGrid = structuredClone(game.player1.board.grid);
      setPlayer1Grid(newGrid as any);

      setCurrentPlayer("player2");
      console.log("setted");
    }
    if (player == "player2") {
      console.log("next");

      game.player2.board.hideShips();
      const newGrid = structuredClone(game.player2.board.grid);
      setPlayer2Grid(newGrid as any);

      setGameStarted(true);
      setCurrentPlayer("player1");
    }
  }

  function handleCaseClick(props: {
    coords: { x: number; y: number };
    player: string;
  }) {
    const setGrid =
      props.player === "player1" ? setPlayer1Grid : setPlayer2Grid;
    const board =
      props.player === "player1" ? game.player1.board : game.player2.board;

    const { grid, hitted } = board.receiveAttack(props.coords);
    const newGrid = structuredClone(grid);
    setGrid(newGrid);
    const isGameFinished = board.getGameStatus();
    if (isGameFinished) {
      setGameFinished(true);
    }
    if (!hitted) {
      props.player == "player1"
        ? setCurrentPlayer("player1")
        : setCurrentPlayer("player2");
    }
  }

  return (
    <>
      {gameFinished ? (
        <FinishedGameContainer>
          <Title>Winner:</Title>
          <SubTitle>
            {" "}
            {currentPlayer == "player1" ? game.player1.name : game.player2.name}
          </SubTitle>
          <Link href={"/"}>
            <WinnerButtonContainer>
              <MainButton>Inicio</MainButton>
            </WinnerButtonContainer>
          </Link>
        </FinishedGameContainer>
      ) : null}

      <Root>
        <BoardsAndSideBarContainerPlayer1>
          <SideBarContainer>
            <SideBar
              currentPlayer={currentPlayer}
              orientation={orientationPlayer1}
              setOrientation={setOrientationPlayer1}
              setLength={setSelectedShipLength}
              player="player1"
              shipsSetted={shipsSettedPlayer1}
            ></SideBar>
          </SideBarContainer>
          <BoardContainer>
            <h2>{game.player1.name}</h2>
            <GameBoardComp
              orientation={orientationPlayer1}
              handleClick={handleCaseClick}
              gameStarted={gameStarted}
              currentPlayer={currentPlayer}
              shipLength={selectedShipLength}
              checkHover={checkHover}
              player="player1"
              grid={player1Grid}
              setShip={setShip}
            ></GameBoardComp>
            <ButtonContainer>
              {gameStarted ? null : (
                <SecondaryButton
                  player="player1"
                  disabled={
                    shipsSettedPlayer1.length == 5 && currentPlayer == "player1"
                      ? false
                      : true
                  }
                  onClick={() => handleNext("player1")}
                >
                  Set ships
                </SecondaryButton>
              )}
            </ButtonContainer>
          </BoardContainer>
        </BoardsAndSideBarContainerPlayer1>

        <BoardsAndSideBarContainerPlayer2>
          <BoardContainer>
            <h2>{game.player2.name}</h2>
            <GameBoardComp
              orientation={orientationPlayer2}
              handleClick={handleCaseClick}
              gameStarted={gameStarted}
              currentPlayer={currentPlayer}
              shipLength={selectedShipLength}
              checkHover={checkHover}
              player="player2"
              grid={player2Grid}
              setShip={setShip}
            ></GameBoardComp>
            <ButtonContainer>
              {gameStarted ? null : (
                <SecondaryButton
                  player="player2"
                  disabled={shipsSettedPlayer2.length == 5 ? false : true}
                  onClick={() => handleNext("player2")}
                >
                  Set ships
                </SecondaryButton>
              )}
            </ButtonContainer>
          </BoardContainer>
          <SideBarContainer>
            <SideBar
              currentPlayer={currentPlayer}
              orientation={orientationPlayer2}
              setOrientation={setOrientationPlayer2}
              setLength={setSelectedShipLength}
              player="player2"
              shipsSetted={shipsSettedPlayer2}
            ></SideBar>
          </SideBarContainer>
        </BoardsAndSideBarContainerPlayer2>
        {gameStarted ? (
          <CurrentPlayerContainer>
            <h1>
              Turn:{" "}
              {currentPlayer == "player1"
                ? game.player1.name
                : game.player2.name}
            </h1>
          </CurrentPlayerContainer>
        ) : null}
      </Root>
    </>
  );
}
