import Image from "next/image";
import { ReactElement } from "react";
import { Background } from "./styled";

export function Layout(props: { children?: ReactElement }) {
  return <Background>{props.children}</Background>;
}
