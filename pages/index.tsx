import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      Home!
      <Link href={"/game"}>Go to game</Link>
    </div>
  );
};

export default Home;
