import React, { ReactElement } from "react";

interface ShipProps {
  coords: { x: number; y: number };
  lenght: number;
  hits: number;
  sunk: boolean;
  direction: "horizontal" | "vertical";
}
export function ShipComponent(props: ShipProps): ReactElement {
  return <div>Game Page</div>;
}
