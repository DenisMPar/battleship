import Link from "next/link";
import { FC, ReactElement } from "react";
import { MainButton } from "ui/buttons";
import { Title } from "ui/text";
import { ButtonContainer, MainContainer, Root } from "./styled";

export function HomePageComp(): ReactElement {
  return (
    <Root>
      <MainContainer>
        <Title>BATTLESHIP</Title>
        <ButtonContainer>
          <Link href={"/lobby"}>
            <MainButton>Play</MainButton>
          </Link>
        </ButtonContainer>
      </MainContainer>
    </Root>
  );
}
