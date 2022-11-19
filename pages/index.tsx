import { HomePageComp } from "components/home-page";
import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "../components/layout";
import { Lobby } from "../components/lobby-page";

const Home: NextPage = () => {
  return <HomePageComp />;
};

export default Home;
