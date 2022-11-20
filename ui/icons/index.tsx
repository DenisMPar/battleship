import { ReactElement } from "react";
import Ship1Svg from "./ship1.svg";
import { BaseIcon } from "./styled";
type Props = {
  className?: string;
};

export function Ship1Icon({ className }: Props): ReactElement {
  return (
    <BaseIcon>
      <Ship1Svg className={className}></Ship1Svg>
    </BaseIcon>
  );
}
