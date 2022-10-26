import Router from "next/router";
import React, { ReactElement } from "react";
import { useRecoilState } from "recoil";
import { playersNameState } from "../../hooks/state";

export function Lobby(): ReactElement {
  const [playersName, setPlayersName] = useRecoilState(playersNameState);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPlayersName({
      player1: e.currentTarget.player1Name.value,
      player2: e.currentTarget.player2Name.value,
    });
    Router.push("/game");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Player 1 name:</h2>
        <input type={"text"} name={"player1Name"}></input>
        <h2>Player 2 name:</h2>
        <input type={"text"} name={"player2Name"}></input>
        <br />
        <button>Iniciar</button>
      </form>
    </div>
  );
}
