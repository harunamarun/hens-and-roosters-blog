import React from "react";
import styles from "./index.css";
import LeftPane from "./components/LeftPane";
import RightPane from "./components/RightPane";
import CenterPane from "./components/CenterPane";

function Home(): JSX.Element {
  return (
    <div className={styles.pane_container}>
      <LeftPane />
      <CenterPane />
      <RightPane />
    </div>
  );
}

export default Home;
