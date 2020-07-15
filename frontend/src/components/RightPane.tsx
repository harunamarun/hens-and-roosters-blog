import React from "react";
import styles from "../index.css";
import NewsList from "./NewsList";

export default function LeftPane(): JSX.Element {
  return (
    <div className={styles.right_pane}>
      <NewsList />
    </div>
  );
}
