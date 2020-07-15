import React from "react";
import Form from "./Form";
import MyList from "./MyList";
import styles from "../index.css";

export default function CenterPane(): JSX.Element {
  return (
    <div className={styles.center_pane}>
      <div className={styles.center_pane_head}>
        <h1>Latest cock-a-doodle-doos</h1>
      </div>
      <Form />
      <MyList />
    </div>
  );
}
