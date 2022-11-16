import { atom } from "recoil";
import { GameModel } from "../lib/models/game";
export const playersNameState = atom({
  key: "playersNameState", // unique ID (with respect to other atoms/selectors)
  default: {
    player1: "",
    player2: "",
  }, // default value (aka initial value)
});
export const shipLengthStatus = atom({
  key: "shipLengthStatus", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});
