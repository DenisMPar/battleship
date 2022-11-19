import lodash from "lodash";
import { ReactElement, useEffect, useState } from "react";
import { GameModel } from "../../lib/models/game";
import { GameBoardComp } from "./gameBoard";
import { Ship1, Ship2, Ship3, Ship4, Ship5 } from "./ship";
import styles from "./styles.module.css";
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
        ? setCurrentPlayer("player2")
        : setCurrentPlayer("player1");
    }
  }

  return (
    <>
      {gameFinished ? (
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            zIndex: "99",
            backgroundColor: `rgba(0, 0, 0, 0.2)`,
          }}
        >
          <h1 style={{ color: "white" }}>Juego terminado!</h1>
        </div>
      ) : null}
      <div className={styles.root}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {!shipsSettedPlayer1.includes(5) ? (
            <Ship1 setLength={setSelectedShipLength}></Ship1>
          ) : null}
          {!shipsSettedPlayer1.includes(4) ? (
            <Ship2 setLength={setSelectedShipLength}></Ship2>
          ) : null}
          {!shipsSettedPlayer1.includes(3) ? (
            <Ship3 setLength={setSelectedShipLength}></Ship3>
          ) : null}
          {!shipsSettedPlayer1.includes(2) ? (
            <Ship4 setLength={setSelectedShipLength}></Ship4>
          ) : null}
          {!shipsSettedPlayer1.includes(1) ? (
            <Ship5 setLength={setSelectedShipLength}></Ship5>
          ) : null}
        </div>
        <div>
          <h2>{game.player1.name}</h2>
          <GameBoardComp
            handleClick={handleCaseClick}
            gameStarted={gameStarted}
            currentPlayer={currentPlayer}
            shipLength={selectedShipLength}
            checkHover={checkHover}
            player="player1"
            grid={player1Grid}
            setShip={setShip}
          ></GameBoardComp>
          <button
            disabled={
              shipsSettedPlayer1.length == 5 && currentPlayer == "player1"
                ? false
                : true
            }
            onClick={() => handleNext("player1")}
          >
            next
          </button>
        </div>
        {currentPlayer == "player2" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {!shipsSettedPlayer2.includes(5) ? (
              <Ship1 setLength={setSelectedShipLength}></Ship1>
            ) : null}
            {!shipsSettedPlayer2.includes(4) ? (
              <Ship2 setLength={setSelectedShipLength}></Ship2>
            ) : null}
            {!shipsSettedPlayer2.includes(3) ? (
              <Ship3 setLength={setSelectedShipLength}></Ship3>
            ) : null}
            {!shipsSettedPlayer2.includes(2) ? (
              <Ship4 setLength={setSelectedShipLength}></Ship4>
            ) : null}
            {!shipsSettedPlayer2.includes(1) ? (
              <Ship5 setLength={setSelectedShipLength}></Ship5>
            ) : null}
          </div>
        ) : null}
        <div>
          <h2>{game.player2.name}</h2>
          <GameBoardComp
            handleClick={handleCaseClick}
            gameStarted={gameStarted}
            currentPlayer={currentPlayer}
            shipLength={selectedShipLength}
            checkHover={checkHover}
            player="player2"
            grid={player2Grid}
            setShip={setShip}
          ></GameBoardComp>
          <button
            disabled={shipsSettedPlayer2.length == 5 ? false : true}
            onClick={() => handleNext("player2")}
          >
            next
          </button>
        </div>
      </div>
    </>
  );
}
