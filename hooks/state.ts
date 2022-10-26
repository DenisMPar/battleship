import { atom } from "recoil";
export const playersNameState = atom({
  key: "playersNameState", // unique ID (with respect to other atoms/selectors)
  default: {
    player1: "",
    player2: "",
  }, // default value (aka initial value)
});
