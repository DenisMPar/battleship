import Router from "next/router";
import React, { ReactElement } from "react";
import { useRecoilState } from "recoil";
import { MainButton } from "ui/buttons";
import { Input } from "ui/input";
import { BigLabel } from "ui/text";
import { playersNameState } from "../../hooks/state";
import { ButtonContainer, Form, MainContainer, Root } from "./styled";

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
    <Root>
      <MainContainer>
        <Form onSubmit={handleSubmit}>
          <BigLabel>Player 1 name:</BigLabel>
          <Input type={"text"} name={"player1Name"} required={true}></Input>
          <BigLabel>Player 2 name:</BigLabel>
          <Input type={"text"} name={"player2Name"} required={true}></Input>
          <br />
          <ButtonContainer>
            <MainButton>Start</MainButton>
          </ButtonContainer>
        </Form>
      </MainContainer>
    </Root>
  );
}
