import React from "react";
import { BrowserRouter } from "react-router-dom";
import BottomPane from "../organisms/BottomPane/BottomPane";
import CenterPane from "../organisms/CenterPane/CenterPane";
import LeftPane from "../organisms/LeftPane/LeftPane";
import RightPane from "../organisms/RightPane/RightPane";
import styles from "./App.css";

function App(): JSX.Element {
  return (
    <div className={styles.pane_container}>
      <BrowserRouter>
        <div className={styles.left_pane}>
          <LeftPane />
        </div>
        <div className={styles.center_pane} id="center">
          <CenterPane />
        </div>
        <div className={styles.right_pane}>
          <RightPane />
        </div>
        <div className={styles.bottom_pane}>
          <BottomPane />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
