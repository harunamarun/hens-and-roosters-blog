import React from "react";
import styles from "./index.css";
import LeftPane from "./components/LeftPane";
import RightPane from "./components/RightPane";
import CenterPane from "./components/CenterPane";

type propsType = {
  query: Record<string, unknown>;
};

function Home(props: propsType): JSX.Element {
  return (
    <div className={styles.pane_container}>
      <LeftPane />
      <CenterPane query={props.query} />
      <RightPane />
    </div>
  );
}

export default Home;
