import type { NextPage } from "next";
import Link from "next/link";
import { Lobby } from "../components/lobby-page";

const Home: NextPage = () => {
  return (
    <div>
      <h1>BattleShip</h1>
      <Lobby></Lobby>
    </div>
  );
};

export default Home;
