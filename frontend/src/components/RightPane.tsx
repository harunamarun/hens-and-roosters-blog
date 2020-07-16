import React from "react";
import styles from "../index.css";
import NewsList from "./NewsList";
import SearchBar from "./SearchBar";

export default function RightPane(): JSX.Element {
  return (
    <div className={styles.right_pane}>
      <SearchBar />
      <NewsList />
    </div>
  );
}
