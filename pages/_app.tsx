import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../public/base.css";
import css from "./styles.module.css";
import { Layout } from "components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <DndProvider backend={HTML5Backend}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DndProvider>
    </RecoilRoot>
  );
}

export default MyApp;
