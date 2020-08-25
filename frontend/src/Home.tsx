import React from "react";
import CenterPane from "./components/CenterPane";
import LeftPane from "./components/LeftPane";
import RightPane from "./components/RightPane";
import styles from "./index.css";
import { centerPropsType } from "./typing/propsType";

function Home(props: centerPropsType): JSX.Element {
  const { query } = props;
  return (
    <div className={styles.pane_container}>
      <LeftPane />
      <CenterPane query={query} />
      <RightPane />
    </div>
  );
}

export default Home;
