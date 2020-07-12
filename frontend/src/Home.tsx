import React from "react";
import Form from "./components/Form";
import MyList from "./components/MyList";
import styles from "./index.css";
import LeftPane from "./components/LeftPane";

function Home(): JSX.Element {
  return (
    <div className={styles.pane_container}>
      <LeftPane />
      <div className={styles.center_pane}>
        <h1>Latest cock-a-doodle-doos</h1>
        <Form />
        <MyList />
      </div>
    </div>
  );
}

export default Home;
